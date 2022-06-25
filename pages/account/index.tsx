import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import useWallet from "hooks/useWallet";
import NFTGallery from "components/NFTGallery";

interface CoverImageProps {
  src: string;
}

const AccountPage: NextPage = () => {
  const { wallet } = useWallet();
  const router = useRouter();

  const CoverImage = ({ src }: CoverImageProps) => {
    return (
      <div className="">
        <Image
          src={src}
          alt="nft"
          layout="responsive"
          // objectFit="contain"
          height={120}
          width={1200}
        />
      </div>
    );
  };

  return (
    <div>
      <CoverImage src="https://storage.googleapis.com/sentinel-nft/raw-assets/113860d69523b0ff742ef62aa51649b41dadcf4bc8e9c7ce6d37b636212bc0bd.jpeg" />
      <div className="flex">
        <Image
          src="https://storage.googleapis.com/sentinel-nft/raw-assets/f741b19deee41d289b7f6f21c5f063015bb0b4df257415fa08aabde17b58673c.png"
          alt="nft"
          layout="fixed"
          objectFit="contain"
          height={120}
          width={1200}
        />
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
      <p>
        Bio: Web3 designer, builder, and explorer. On a mission to solve global
        coordination problems.
      </p>
      <NFTGallery
        address={
          wallet?.address || "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72"
        }
      />
    </div>
  );
};

export default AccountPage;
