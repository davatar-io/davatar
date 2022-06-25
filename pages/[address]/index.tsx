import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
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
    <div>
      <div className="flex">
        Header
      </div>
      <div className="flex">
        <h1>{address}</h1>  
      </div>
      <div className="flex">
        Bio
      </div>
      <div className="flex">
        {nfts &&
          nfts.map((nft, i) => {
            console.log("nft", nft);

            return (
              <div className="flex-col" key={i}>
                {nft.metadata.name}
                <Image
                  src={nft.cached_file_url}
                  alt="nft"
                  width={500}
                  height={500}
                  layout='fixed'
                  className="flex flex-shrink-0"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddressPage;
