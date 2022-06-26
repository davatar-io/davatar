import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Header from 'components/Header';

import { useWallet } from 'context/WalletContext';
import WalletManager from 'managers/WalletManager';

const Home: NextPage = () => {
  const { wallet, setWallet } = useWallet();

  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p className="w-full text-left bg-black">hallo</p>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="/account" className={styles.card}>
            <h2>Account</h2>
          </a>
          <a href="/jpren.eth" className={styles.card}>
            <h2>Address</h2>
          </a>
          <a href="/login" className={styles.card}>
            <h2>Login</h2>
          </a>
        </div>
        <h2>{wallet?.address}</h2>
        <button
          onClick={() => {
            // connectWallet();
          }}
        >
          connect
        </button>
        <button
          onClick={() => {
            // disconnectWallet();
          }}
        >
          logout
        </button>
        <button
          onClick={() => {
            setWallet({ address: 'asdfasfd' });
          }}
        >
          set address
        </button>
        <h1>{wallet?.address}</h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
