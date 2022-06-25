// import useWallet from 'hooks/useWallet';
import WalletManager from 'managers/WalletManager';
import { useWallet } from 'context/WalletContext';

interface Props {}

const ConnectWalletButton = () => {
  const { wallet } = useWallet();
  if (wallet) {
    return (
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-primary">
          {wallet.ens ? wallet.ens : wallet.address}
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li
            onClick={() => {
              WalletManager.disconnect();
            }}
          >
            <a>Logout</a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <button
      className="btn btn-primary"
      tabIndex={0}
      onClick={() => {
        WalletManager.connect();
      }}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
