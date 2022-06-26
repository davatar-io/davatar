import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Storage } from '@google-cloud/storage';
import { createClient } from '@supabase/supabase-js';

const NFTPORT_API = process.env.NFT_PORT_API;
const GOOGLE_STORAGE_PK = process.env.GOOGLE_STORAGE_PK;

const supabaseUrl = 'https://tqbyygslnzmohwcllypw.supabase.co';
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxYnl5Z3Nsbnptb2h3Y2xseXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYyNDA5NzcsImV4cCI6MTk3MTgxNjk3N30.gWI1KY9lsqEH7r4r4AwNWLKkLwzhpN2Rn24XVvkjnmU'
);

const uploadToBucket = async (file: Buffer, address: string) => {
  // Uploads image to google cloud storage
  if (address === '') {
    throw new Error('address is empty');
  }

  const storage = new Storage({
    projectId: 'davatar',
    credentials: {
      client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
      private_key: GOOGLE_STORAGE_PK,
    },
  });

  const filePath = `images/${address}/profile.png`;
  const bucket = storage.bucket('davatar');
  const upload = bucket.file(filePath);
  const resp = await upload.save(file);

  return resp;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;
  console.log(address);

  //TODO: Resolve ENS & Address

  //@ts-ignore
  let url = await getDefault(address);
  let imageMissing = true;

  // PATCH FIX FOR DEMOS
  // If our database has saved an image_url, set it
  // TODO: check for ens address
  const { data, error } = await supabase
    .from('imageurls')
    .select('*')
    .eq('address', address);

  if (!error && data[0]) {
    url = data[0].image_url;
    imageMissing = false;
  }

  //1. TODO: Check if image exists & apply filters
  if (imageMissing) {
    const imgixUrl = `https://davatar.imgix.net/${address}/profile.png`;
    const imgix = await fetch(imgixUrl).then((res) =>
      res.status === 200 ? true : false
    );

    console.log('Image Exists', imgixUrl);

    if (imgix) {
      imageMissing = false;
      url = imgixUrl;
    }
  }

  // Fallback if image not saved
  if (imageMissing) {
    //2. Fallback to ENS
    let fallbackFound = false;
    if (address.includes('.eth') && imageMissing === true) {
      console.log('eth!!');
      const ensExists = await axios
        .get(`https://metadata.ens.domains/mainnet/avatar/${address}/meta`)
        .catch((e) => console.log('e', e));

      if (ensExists) {
        fallbackFound = true;
        url = `https://metadata.ens.domains/mainnet/avatar/${address}`;
      }
    }

    //2. Fallback to NFTs
    // add other contracts, check if image url is valid
    if (fallbackFound === false) {
      const nftport = `https://api.nftport.xyz/v0/accounts/${address}?chain=ethereum&include=metadata&page_size=1&contract_address=0x60e4d786628fea6478f785a6d7e704777c86a7c6`;
      const resp = await axios
        .get(nftport, {
          headers: { Authorization: `${NFTPORT_API}` },
        })
        .then((res) => res.data)
        .catch((e) => console.log('e', e));

      if (resp && resp.nfts?.length > 0) {
        // resp[0]
        // confirm file url exists
        console.log(resp.nfts[0]?.cached_file_url);
        url = resp.nfts[0].cached_file_url;
        console.log(url);
      }
    }
  }

  // Return image
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  const buffer = Buffer.from(response.data, 'base64');

  //3. TODO: Upload to storage
  if (imageMissing === true) {
    //@ts-ignore
    const upload = await uploadToBucket(buffer, address);
    console.log(upload);
    console.log('Uploading image');
  }

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': buffer.length,
  });
  res.end(buffer, 'base64');
}

const resolveEnsAndAddress = async (input: string) => {
  let ens;
  let address;

  if (input.includes('.eth')) {
    ens = input;
  }
};

const getEnsImage = async (ens: string) => {
  console.log('eth!!');
  //@ts-ignore
  const ensExists = await axios
    .get(`https://metadata.ens.domains/mainnet/avatar/${ens}/meta`)
    .catch((e) => console.log('e', e));

  if (ensExists) {
    //@ts-ignore
    return `https://metadata.ens.domains/mainnet/avatar/${ens}`;
  }
};

const getDefault = async (address: string) =>
  `https://avatars.dicebear.com/api/bottts/${address}.png`;
