import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useWallet } from 'context/WalletContext';
import WalletManager from 'managers/WalletManager';

// import logoColour from "../assets/LogoColour.png";
import logoColour from '../assets/LogoColour.svg';
import Button from 'components/Button';

const LogoColour = () => {
  return (
    <div className="flex items-center">
      <Image
        src={logoColour}
        alt="davatar.io color logo"
        layout="fixed"
        width={355}
        height={108}
      />
    </div>
  );
};

interface FormProps {
  onChange: (value: string) => void;
}
const Form = ({ onChange }: FormProps) => {
  return (
    <form className="flex justify-start w-full shadow-md border bg-white">
      <div className="flex py-2 pl-3 pr-1 text-gray-900">
        https://davatar.io/api/
      </div>
      <input
        className="w-full appearance-none py-2 pl-0 text-gray-700 focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="vitalik.eth"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </form>
  );
};

const Home: NextPage = () => {
  const { wallet, setWallet } = useWallet();
  const router = useRouter();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    if (wallet) {
      router.push('/account/');
    }
  }, [wallet, router]);

  return (
    <div className="flex w-full center-viewport">
      <main className="flex flex-col justify-center items-center w-full">
        <LogoColour />
        <div className="w-11/12 lg:w-1/2 mt-11 mb-5">
          <Form
            onChange={(value) => {
              setAddress(value);
            }}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="retro"
            label="Get Davatar"
            onClick={() => {
              window.open(
                `https://davatar.io/api/${address ? address : 'vitalik.eth'}`,
                '_blank'
              );
            }}
          />
          <Button
            variant="retro"
            label="Update my Davatar"
            onClick={() => {
              wallet ? router.push('/account/edit') : WalletManager.connect();
            }}
          />
        </div>

        {/*
        <button
          onClick={() => {
            ENSManager.setAvatar(
              wallet?.ens!,
              'https://pbs.twimg.com/profile_images/1237620200821805057/n52DTaCC_400x400.jpg'
            );
          }}
        >
          set avatar
        </button> */}
      </main>
    </div>
  );
};

export default Home;
