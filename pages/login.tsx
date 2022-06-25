import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import styles from '../styles/Home.module.css';

import useWallet from 'hooks/useWallet';

const LoginPage: NextPage = () => {
  // const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const { wallet, setWallet } = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   const providerOptions = {
  //     walletconnect: {
  //       package: WalletConnectProvider, // required
  //       options: {
  //         infuraId: 'ff164059cfe049058c2a0852bffd8e5a', // required
  //       },
  //     },
  //   };
  //   const newWeb3Modal = new Web3Modal({
  //     network: 'mainnet', // optional
  //     cacheProvider: true, // optional
  //     providerOptions, // required
  //   });
  //   setWeb3Modal(newWeb3Modal);
  // }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
          {wallet?.address ? 'Connected: ' + wallet.address : 'Not Connected'}
        </h1>
        <button
          onClick={async () => {
            /*
            const instance = await web3Modal?.connect();
            console.log('connected');
            const web3 = new Web3(instance);

            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();

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
              console.log('provider: connect - ', info);
            });

            // Subscribe to provider disconnection
            provider.on(
              'disconnect',
              (error: { code: number; message: string }) => {
                console.log(error);
              }
            );

            provider.getResolver('jpren.eth').then((idk) => {
              console.log('resolved ', idk);
            });

            provider.getAvatar('jpren.eth').then((avatar) => {
              console.log('got avatar', avatar);
            });

            const JP_WALLET = '0x78a42a84bfe3e173c3a9246b3f5f1c5aa8bbae72';
            provider.resolveName(JP_WALLET).then((name) => {
              console.log('resolved name', name);
            });

            signer.getAddress().then((res) => {
              console.log('get Address - ', res);
            });
            provider.lookupAddress(JP_WALLET).then((ens) => {
              console.log('ens is', ens);
            });

            // const accounts = await web3.eth.getAccounts();
            // const address = accounts[0];

            // if (address) {
            //   setWallet({ address });
            //   // router.push('/account');
            // }
            */
          }}
        >
          Connect Wallet
        </button>
        <button
          onClick={() => {
            // web3Modal?.clearCachedProvider();
          }}
        >
          logout
        </button>
        <button
          onClick={() => {
            // connectWallet();
          }}
        >
          connect 2
        </button>
        <button
          onClick={() => {
            // disconnectWallet();
          }}
        >
          logout 2
        </button>
      </main>
    </div>
  );
};

export default LoginPage;
