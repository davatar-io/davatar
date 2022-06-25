import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {}, [address]);

  return (
    <div>
      <h1>{address}</h1>
    </div>
  );
};

export default AddressPage;
