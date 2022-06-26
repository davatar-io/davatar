import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useWallet } from "context/WalletContext";
import NFTGallery from "components/NFTGallery";

const AccountPage: NextPage = () => {
  const { wallet } = useWallet();
  const router = useRouter();

  const CoverImage = () => {
    return (
      <div className="flex w-full px-8 -z-10">
        <div className="h-80 w-full rounded-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col w-full">
        <CoverImage />
        <div className="flex mx-auto -mt-20 rounded-full border-white border-8 overflow-hidden">
          <Image
            src="https://storage.googleapis.com/sentinel-nft/raw-assets/f741b19deee41d289b7f6f21c5f063015bb0b4df257415fa08aabde17b58673c.png"
            alt="nft"
            layout="fixed"
            objectFit="contain"
            height={160}
            width={160}
          />
        </div>
        <h1 className="w-full justify-center text-center font-semibold text-2xl mt-3">
          {wallet?.ens || wallet?.address}
        </h1>
      </div>
      <div className="flex w-full justify-center mt-4 mb-8">
        <button
          className="px-6 py-3 rounded-xl border border-gray-300 font-medium shadow-sm hover:bg-gray-100"
          onClick={() => {
            router.push("/account/edit");
          }}
        >
          Edit avatar
        </button>
      </div>
      <NFTGallery address={wallet?.address} />
    </div>
  );
};

export default AccountPage;
