import { atom, useRecoilState } from 'recoil';

import { Wallet } from 'types/Wallet';
interface WalletState {
  wallet?: Wallet;
}

const state = atom<WalletState>({
  key: 'walletState',
  default: {},
});

interface UseWalletHook {
  wallet: Wallet | undefined;
  setWallet: (wallet: Wallet) => void;
}

const useWallet = (): UseWalletHook => {
  const [walletState, setWalletState] = useRecoilState(state);
  const { wallet } = walletState;
  const setWallet = (wallet: Wallet) => {
    console.log('\n\n\n\nhitting set wallet');
    setWalletState({ wallet });
  };

  return { wallet, setWallet };
};

export default useWallet;
