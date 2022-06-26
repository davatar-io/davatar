import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useWallet } from 'context/WalletContext';
import Button from 'components/Button';
import ENSManager from 'managers/ENSManager';

const DeletePage: NextPage = () => {
  const { wallet } = useWallet();
  const router = useRouter();
  const [deleting, setDeleting] = useState<boolean>(false);

  const deleteAvatar = async () => {
    setDeleting(true);
    let transaction = await ENSManager.setAvatar(wallet?.ens!, '');
    if (!transaction) {
      setDeleting(false);
    } else {
      transaction
        .wait(1)
        .then(() => {
          console.log('succeeded');
        })
        .catch(() => {
          console.log('caught it here');
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  };

  return (
    <div className="w-full h-full flex flex-1 justify-center items-center">
      {wallet?.avatar && wallet.ens && (
        <Button
          label={deleting ? 'Deleting' : 'Delete ENS Pic'}
          onClick={() => {
            deleteAvatar();
          }}
          disabled={deleting}
        />
      )}
    </div>
  );
};

export default DeletePage;
