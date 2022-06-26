import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { Wallet } from 'types/Wallet';

class WalletManager {
  web3Modal?: Web3Modal;
  provider?: ethers.providers.Web3Provider;

  onWalletConnected?: (wallet: Wallet) => void;

  initialize = (onWalletConnected: (wallet: Wallet) => void) => {
    console.log('**WalletManager initialize', onWalletConnected);
    this.onWalletConnected = onWalletConnected;

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
    }
  };

  connect = async () => {
    console.log('called connect wallet');
    const instance = await this.web3Modal?.connect();
    console.log('connected');
    const web3 = new Web3(instance);
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    this.provider = provider;

    let address = await signer.getAddress();
    let ens = (await provider.lookupAddress(address)) || undefined;
    console.log('just got wallet info: ', { address, ens });
    console.log(this.onWalletConnected);
    this.onWalletConnected && this.onWalletConnected({ address, ens });
    console.log('here again');
  };

  disconnect = () => {
    this.web3Modal?.clearCachedProvider();
    window.location.reload();
  };
}

export default new WalletManager();
