import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

const AccountEditPage: NextPage = () => {
  const router = useRouter();
  const address = "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72";
  const [nfts, setNfts] = useState<any>();

  useEffect(() => {

    const options = {
      method: 'GET',
      url: `https://api.nftport.xyz/v0/accounts/${address}`,
      params: {chain: 'ethereum', contract_address: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", include: "metadata"},
      headers: {'Content-Type': 'application/json', Authorization: '51bb64f4-d1da-462a-b285-081b6db439fc'}
    };

    if (address) {
      axios.request(options).then((response) => {
        console.log(response.data);
        setNfts(response.data.nfts)
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [address]);

  return (
    <div>
      <h1>Choose a profile picture from your wallet</h1>
      {nfts &&
          nfts.map((nft, i) => {
            console.log("nft", nft);

            return (
              <div className="flex" key={i}>
                <div className="flex flex-col h-48">
                  <div className="flex w-full h-full relative">
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default AccountEditPage;
