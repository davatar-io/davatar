import WalletManager from 'managers/WalletManager';
import React, { useEffect, useState } from 'react';
import { Wallet } from 'types/Wallet';

type WalletContextType = {
  wallet?: Wallet;
  setWallet: (wallet: Wallet) => void;
};
const walletContextDefaultValues: WalletContextType = { setWallet: () => {} };
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

  useEffect(() => {
    if (setWallet) {
      WalletManager.initialize(setWallet);
    }
  }, [setWallet]);

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
}
