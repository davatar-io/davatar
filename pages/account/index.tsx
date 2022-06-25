import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import useWallet from "hooks/useWallet";
import NFTGallery from "components/NFTGallery";

const AccountPage: NextPage = () => {
  const { wallet } = useWallet();
  const router = useRouter();

  const CoverImage = () => {
    return (
      <div className="flex px-6 pt-6 z-0">
        <div className="h-80 w-full rounded-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
      </div>
    );
  };

  return (
    <div>
      <div className="">
        <div className="flex px-6 pt-6 z-0">
          <div className="h-80 w-full rounded-2xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </div>
        <div className="flex z-10 -mt-20 mx-auto">
          <Image
            src="https://storage.googleapis.com/sentinel-nft/raw-assets/f741b19deee41d289b7f6f21c5f063015bb0b4df257415fa08aabde17b58673c.png"
            alt="nft"
            layout="fixed"
            objectFit="contain"
            height={160}
            width={160}
          />
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push("/account/edit");
        }}
      >
        Edit My Account
      </button>
      <h1>{wallet?.address || "Display Name"}</h1>
      <NFTGallery
        address={
          wallet?.address || "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72"
        }
      />
    </div>
  );
};

export default AccountPage;
