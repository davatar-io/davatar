import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

import useWallet from 'hooks/useWallet';

import Web3 from 'web3';
import Web3Modal from 'web3modal';

import WalletConnectProvider from '@walletconnect/web3-provider';

const LoginPage: NextPage = () => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const { wallet, setWallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'ff164059cfe049058c2a0852bffd8e5a', // required
        },
      },
    };
    const newWeb3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
    setWeb3Modal(newWeb3Modal);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
          {wallet?.address ? 'Connected: ' + wallet.address : 'Not Connected'}
        </h1>
        <button
          onClick={async () => {
            const provider = await web3Modal?.connect();
            console.log('connected');
            const web3 = new Web3(provider);
            // Subscribe to accounts change
            provider.on('accountsChanged', (accounts: string[]) => {
              console.log(accounts);
            });

            // Subscribe to chainId change
            provider.on('chainChanged', (chainId: number) => {
              console.log(chainId);
            });

            // Subscribe to provider connection
            provider.on('connect', (info: { chainId: number }) => {
              console.log(info);
            });

            // Subscribe to provider disconnection
            provider.on(
              'disconnect',
              (error: { code: number; message: string }) => {
                console.log(error);
              }
            );

            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            console.log(address);
            if (address) {
              setWallet({ address });
              router.push('/account');
            }
          }}
        >
          Connect Wallet
        </button>
        <button
          onClick={() => {
            web3Modal?.clearCachedProvider();
          }}
        >
          logout
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
