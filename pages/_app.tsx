import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { useEffect } from 'react';
import { WalletContextProvider } from 'context/WalletContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WalletContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </WalletContextProvider>
    </RecoilRoot>
  );
}

export default MyApp;
