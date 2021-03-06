import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

import ENSManager from './ENSManager';

import { Wallet } from 'types/Wallet';

class WalletManager {
  web3Modal?: Web3Modal;
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;

  onWalletConnected?: (wallet: Wallet) => void;
  setWalletLoading?: (loading: boolean) => void;

  initialize = (
    onWalletConnected: (wallet: Wallet) => void,
    setWalletLoading: (loading: boolean) => void
  ) => {
    this.onWalletConnected = onWalletConnected;
    this.setWalletLoading = setWalletLoading;

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
    this.web3Modal = newWeb3Modal;

    // connect automatically and without a popup if user is already connected
    if (this.web3Modal && this.web3Modal.cachedProvider) {
      this.connect();
    } else {
      this.setWalletLoading && this.setWalletLoading(false);
    }
  };

  connect = async () => {
    this.setWalletLoading && this.setWalletLoading(true);
    const instance = await this.web3Modal?.connect();
    const web3 = new Web3(instance);
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    this.provider = provider;
    this.signer = signer;

    let address = await signer.getAddress();
    let ens = (await provider.lookupAddress(address)) || undefined;
    let ensAvatar = (await provider.getAvatar(address)) || undefined;

    console.log('wallet: ', { address, ens, ensAvatar });
    this.onWalletConnected &&
      this.onWalletConnected({ address, ens, avatar: ensAvatar });
    this.setWalletLoading && this.setWalletLoading(false);

    ENSManager.initialize(provider);
  };

  disconnect = () => {
    this.web3Modal?.clearCachedProvider();
    window.location.reload();
  };
}

export default new WalletManager();
