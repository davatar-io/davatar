import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { NFTData } from "types/NFTPort";

interface Props {
  address: string;
  onSelect?: (nft: NFTData) => void;
}

const NFTGallery = ({ address, onSelect }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nfts, setNfts] = useState<NFTData[]>();
  const [selectedKey, setSelectedKey] = useState<number>();

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
          setNfts(result.data.nfts);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [address]);

  const renderNFT = (nft: NFTData, index: number) => {
    
    return (
      <div
        key={index}
        className={`m-3 border-4 rounded-xl overflow-hidden ${onSelect ? "cursor-pointer" : ""} ${
          selectedKey === index ? "border-indigo-600" : "border-white"
        }`}
        onClick={() => {
          onSelect && onSelect(nft);
          setSelectedKey(index);
        }}
      >
        <div className="flex flex-col h-64">
          <div className={`flex justify-center align-center w-64 h-64 rounded-lg bg-gray-800 relative ${
          selectedKey === index ? "opacity-50" : ""
        }`}>
            {nft.cached_file_url && (
              <Image
                src={nft.cached_file_url}
                alt="nft"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          {/* {nft.metadata?.name || "Unnamed"} */}
        </div>
      </div>
    );
  };

  if (loading) {
    // TODO: return loading screen here
    return <div>Loading your NFTs...</div>;
  }

  return (
    <div className="">
      <div className="flex flex-wrap w-full justify-center pb-24">
        {nfts &&
          nfts.map((nft, i) => {
            // console.log("nft", nft);
            return renderNFT(nft, i);
          })}
      </div>
    </div>
  );
};

export default NFTGallery;
