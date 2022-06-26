import WalletManager from 'managers/WalletManager';
import React, { useEffect, useState } from 'react';
import { Wallet } from 'types/Wallet';

type WalletContextType = {
  wallet?: Wallet;
  setWallet: (wallet: Wallet) => void;
  walletLoading?: boolean;
  setWalletLoading: (loading: boolean) => void;
};
const walletContextDefaultValues: WalletContextType = {
  setWallet: () => {},
  setWalletLoading: () => {},
};
const WalletContext = React.createContext<WalletContextType>(
  walletContextDefaultValues
);

export function useWallet() {
  return React.useContext(WalletContext);
}

type Props = {
  children: React.ReactNode;
};

export function WalletContextProvider({ children }: Props) {
  const [wallet, setWallet] = useState<Wallet>();
  const [walletLoading, setWalletLoading] = useState<boolean>(true);

  useEffect(() => {
    if (setWallet) {
      WalletManager.initialize(setWallet, setWalletLoading);
    }
  }, [setWallet, setWalletLoading]);

  return (
    <WalletContext.Provider
      value={{ wallet, setWallet, walletLoading, setWalletLoading }}
    >
      {children}
    </WalletContext.Provider>
  );
}
