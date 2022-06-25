import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import useWallet from 'hooks/useWallet';

const AccountPage: NextPage = () => {
  const { wallet } = useWallet();
  const router = useRouter();
  return (
    <div>
      <h1>{wallet?.address}</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push('/account/edit');
        }}
      >
        Edit My Account
      </button>
    </div>
  );
};

export default AccountPage;
