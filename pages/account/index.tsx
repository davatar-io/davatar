import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AccountPage: NextPage = () => {
  const router = useRouter();
  return (
    <div>
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
