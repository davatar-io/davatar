import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import Image from 'next/image';

import NFTGallery from 'components/NFTGallery';
import useWallet from 'hooks/useWallet';

const AccountEditPage: NextPage = () => {
  const { wallet } = useWallet();
  const [image, setImage] = useState<any>();

  return (
    <div>
      <p>edit stuff</p>
      <NFTGallery
        address={
          wallet?.address || '0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72'
        }
        onSelect={(selectedNFT) => {
          // console.log('this nft was selected', selectedNFT)
        }}
      />
    </div>
  );
};

export default AccountEditPage;
