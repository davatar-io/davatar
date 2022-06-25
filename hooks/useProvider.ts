import { useEffect, useState } from 'react';

import Web3 from 'web3';
import Web3Modal from 'web3modal';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

import useWallet from './useWallet';

interface UseProviderHook {
  provider: any;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

const useProvider = (): UseProviderHook => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const { wallet, setWallet } = useWallet();
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

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  const connectWallet = async () => {
    const instance = await web3Modal?.connect();
    console.log('connected');
    const web3 = new Web3(instance);
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    setProvider(provider);

    signer.getAddress().then((res) => {
      console.log('get Address - ', res);
      setWallet({ address: res });
    });
  };

  const disconnectWallet = () => {
    web3Modal?.clearCachedProvider();
    window.location.reload();
  };

  return { provider, connectWallet, disconnectWallet };
};

export default useProvider;
