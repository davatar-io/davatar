import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const NFTPORT_API = "d447284d-dd1c-42f3-9daa-04510ecd09d2"

const getDefault = async (address: string) => `https://avatars.dicebear.com/api/bottts/${address}.png`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {address} = req.query

    console.log(address)

    let url = await getDefault(address)

    //1. Check if image exists

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
    
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
    });
    res.end(buffer, "base64");
}


const getEnsImage = async (ens: string) => {
 
    console.log("eth!!")
    const ensExists = await axios.get(`https://metadata.ens.domains/mainnet/avatar/${address}/meta`)
        .catch(e => console.log("e", e))
    
    if (ensExists) {
        return `https://metadata.ens.domains/mainnet/avatar/${address}`
    } 

}