import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

import { NFTData } from 'types/NFTPort';

interface Props {
  address: string;
  onSelect?: (nft: NFTData) => void;
}

const NFTGallery = ({ address, onSelect }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NFTData[]>();

  useEffect(() => {
    if (address) {
      axios
        .get(`https://api.nftport.xyz/v0/accounts/${address}`, {
          params: {
            account_address: address,
            chain: 'ethereum',
            include: 'metadata',
            page_size: '10',
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: '51bb64f4-d1da-462a-b285-081b6db439fc',
          },
        })
        .then((result) => {
          console.log(result.data);
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
        className={`${onSelect ? 'cursor-pointer' : ''} `}
        onClick={() => {
          onSelect && onSelect(nft);
        }}
      >
        <div className="flex flex-col h-48">
          <div className="flex w-full h-full relative">
            {nft.cached_file_url && (
              <Image
                src={nft.cached_file_url}
                alt="nft"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          {nft.metadata?.name || 'Unnamed'}
        </div>
      </div>
    );
  };

  if (loading) {
    // TODO: return loading screen here
  }

  return (
    <div className="">
      <div className="flex flex-wrap w-full">
        {nfts &&
          nfts.map((nft, i) => {
            console.log('nft', nft);
            return renderNFT(nft, i);
          })}
      </div>
    </div>
  );
};

export default NFTGallery;
