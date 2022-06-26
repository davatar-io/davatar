import WalletManager from "managers/WalletManager";
import { useWallet } from "context/WalletContext";
import Button from "./Button";

interface Props {}

const ConnectWalletButton = () => {
  const { wallet } = useWallet();
  if (wallet) {
    return (
      <div className="dropdown dropdown-end">
        <Button tabIndex={0} label={wallet.ens ? wallet.ens : wallet.address} />
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
    <>
      <Button
        label="Connect wallet"
        tabIndex={0}
        onClick={() => {
          WalletManager.connect();
        }}
      />
    </>
  );
};

export default ConnectWalletButton;
