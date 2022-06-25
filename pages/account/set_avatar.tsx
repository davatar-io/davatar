import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const AddressPage: NextPage = () => {
  const router = useRouter();
  const address = "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72";
  const [nfts, setNfts] = useState<any>();

  useEffect(() => {
    if (address) {
      axios
        .get(`https://api.nftport.xyz/v0/accounts/${address}`, {
          params: {
            account_address: address,
            chain: "ethereum",
            include: "metadata",
            page_size: "10",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "51bb64f4-d1da-462a-b285-081b6db439fc",
          },
        })
        .then((result) => {
          console.log(result.data);
          setNfts(result.data.nfts);
        });
    }
  }, [address]);

  return (
    <div className="flex flex-col max-w-3xl px-4 mx-auto">
      <div className="flex">
        Davatar.io
      </div>
      <div className="flex w-48 h-48 bg-gray-100">
        
      </div>
      <div className="flex flex-wrap w-full">
        {nfts &&
          nfts.map((nft, i) => {
            console.log("nft", nft);

            return (
              <div className="flex" key={i}>
                <div className="flex flex-col h-48">
                  <div className="flex w-full h-full relative">
                    <Image
                      src={nft.cached_file_url}
                      alt="nft"
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  {nft.metadata.name}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex">Footer</div>
    </div>
  );
};

export default AddressPage;
