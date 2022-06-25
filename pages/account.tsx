import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const AccountPage: NextPage = () => {
  return (
    <div>
      <button
        className="button button-primary"
        onClick={() => {
          alert('clicked');
        }}
      >
        Edit My Account
      </button>
    </div>
  );
};

export default AccountPage;
