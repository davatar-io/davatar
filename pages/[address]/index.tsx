import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

const AddressPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div className="flex flex-col max-w-3xl px-4 mx-auto">
      <div className="flex">Davatar.io</div>
      <div className="flex">Cover image</div>
      <div className="flex">
        <h1>{address}</h1>
      </div>
      <div className="flex">Bio</div>
      <div className="flex">
        <h2>Contact</h2>
        <div className="flex">Twitter</div>
      </div>
      <div className="flex">Footer</div>
    </div>
  );
};

export default AddressPage;
