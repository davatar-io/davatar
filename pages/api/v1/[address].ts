import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Storage } from "@google-cloud/storage";

const NFTPORT_API = process.env.NFT_PORT_API

const uploadToBucket = async (file: Buffer, address: string) => {
    // Uploads image to google cloud storage
    if (address === "") {
        throw new Error("address is empty")
    }

    const storage = new Storage({
        projectId: "davatar", 
        credentials: { 
            "client_email": process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
            "private_key": process.env.GOOGLE_STORAGE_PK
        }
    })

    const filePath = `images/${address}/profile.png` 
    const bucket = storage.bucket("davatar")
    const upload = bucket.file(filePath)
    const resp = await upload.save(file)

    return resp
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
    const {address} = req.query

    console.log(address)
    
    let url = await getDefault(address)
    
    //1. TODO: Check if image exists & apply filters


    //2. Fallback to ENS
    if (address.includes('.eth')) { 
        console.log("eth!!")
        const ensExists = await axios.get(`https://metadata.ens.domains/mainnet/avatar/${address}/meta`)
            .catch(e => console.log("e", e))
            
            if (ensExists) {
                url = `https://metadata.ens.domains/mainnet/avatar/${address}`
            } 
        } 
        
        //2. Fallback to NFTs
        // add other contracts, check if image url is valid
        const nftport = `https://api.nftport.xyz/v0/accounts/${address}?chain=ethereum&include=metadata&page_size=1&contract_address=0x60e4d786628fea6478f785a6d7e704777c86a7c6`
        const resp = await axios.get(nftport, {
            headers: {'Authorization': `${NFTPORT_API}`}
        }).then( res => res.data ).catch(e => console.log("e", e))
        
        if (resp) {
            // resp[0]
            // confirm file url exists
            console.log(resp.nfts[0].cached_file_url)
        url = resp.nfts[0].cached_file_url
        console.log(url)
    }      
    
    
    //3. TODO: Upload to storage
    
    // Return image
    const response = await axios.get(url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "base64");

    const upload = await uploadToBucket(buffer, address)
    console.log(upload)
    
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
    });
    res.end(buffer, "base64");
}

// const resolveEnsAndAddress = async (input: string) => { 
// }


const getEnsImage = async (ens: string) => {
    
    console.log("eth!!")
    const ensExists = await axios.get(`https://metadata.ens.domains/mainnet/avatar/${address}/meta`)
    .catch(e => console.log("e", e))
    
    if (ensExists) {
        return `https://metadata.ens.domains/mainnet/avatar/${address}`
    } 
}

const getDefault = async (address: string) => `https://avatars.dicebear.com/api/bottts/${address}.png`