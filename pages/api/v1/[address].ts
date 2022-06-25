import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {address} = req.query

  console.log(address)

  let url = `https://avatars.dicebear.com/api/bottts/${address}.png`


  if (address.includes('.eth')) { 
    console.log("eth!!")
    const ensExists = await axios.get(`https://metadata.ens.domains/mainnet/avatar/${address}/meta`)
        .catch(e => console.log("e", e))
    
    console.log("hii", ensExists)
    if (ensExists) {
        url = `https://metadata.ens.domains/mainnet/avatar/${address}`
    } 
  } 
 
    //1. Check if image exists


    //2. Fallback image
  
  //const url = `https://avatars.dicebear.com/api/bottts/${address}.png`
  
  
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


const getImage = async (ens: string) => {

    const resp = await axios.get(`https://metadata.ens.domains/mainnet/avatar/${ens}/meta`)
    console.log(resp)    

}