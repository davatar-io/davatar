import type { NextPage } from "next";
import { useRouter, withRouter } from "next/router";

import useWallet from "hooks/useWallet";

const AccountPage: NextPage = ({ router: fromEdit }) => {
  console.log("selected NFt ", fromEdit.query.selectedNFT);

  const { wallet } = useWallet();
  const router = useRouter();
  return (
    <div>
      <h1>{wallet?.address}</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push("/account/edit");
        }}
      >
        Edit My Account
      </button>
    </div>
  );
};

export default withRouter(AccountPage);
