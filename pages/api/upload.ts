import type { NextApiRequest, NextApiResponse } from 'next'
import { Storage } from "@google-cloud/storage";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {file, address} = req.body

    // TODO: validate address, and not ENS
    
    const resp = uploadToBucket(file, address)
    //TODO: catch errors

    res.status(200).json({ Response: resp })
}


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


