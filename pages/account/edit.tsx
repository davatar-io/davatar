import { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Image from "next/image";

import ImageDropzone from "components/ImageDropzone";
import NFTGallery from "components/NFTGallery";

import useWallet from "hooks/useWallet";
import { useRouter } from "next/router";

const AccountEditPage: NextPage = () => {
  const { wallet } = useWallet();
  const [image, setImage] = useState<any>();
  const [imageType, setImageType] = useState<"nft" | "upload">("nft");
  const router = useRouter();

  const renderImageTypeButtonGroup = () => {
    return (
      <div className="flex w-full mb-8">
        <div className="flex mx-auto bg-gray-200 rounded-xl overflow-hidden">
          <div
            className={`bg-gray-200 px-6 py-3 cursor-pointer ${imageType === 'nft' && 'bg-gray-900 text-white font-semibold'}`}
            onClick={() => {
              setImageType('nft');
            }}
          >
            NFTs
          </div>
          <div
            className={`bg-gray-200 px-6 py-3 cursor-pointer ${imageType === 'upload' && 'bg-gray-900 text-white font-semibold'}`}
            onClick={() => {
              setImageType('upload');
            }}
          >
            Upload
          </div>
        </div>
      </div>
    );
  };

  const renderImageSelect = () => {
    return (
      <div>
        {imageType === "nft" ? (
          <NFTGallery
            address={
              wallet?.address || "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72"
            }
            onSelect={(selectedNFT) => {
              console.log("this nft was selected", selectedNFT);
              setImage(selectedNFT);
            }}
          />
        ) : (
          <ImageDropzone
            onImageSelect={(img) => {
              console.log(img);
              alert("image was set");
            }}
          />
        )}
      </div>
    );
  };

  const renderButtonDone = () => {
    return (
      <button
        className={`px-6 py-3 bg-gray-900 font-semibold text-white rounded-xl hover:bg-gray-800 active:scale-105 transition-all ease-in-out ${imageType === "nft" && "scale-110"}`}
        onClick={() => {
          console.log("Submit this image", image);
          // how to pass data via router?
          router.push({
            pathname: "/account",
            query: { selectedNFT: image?.cached_file_url },
          });
        }}
      >
        Done
      </button>
    );
  };

  return (
    <div className="flex">
      <div className="w-full max-w-4xl mx-auto">
        <p>edit stuff</p>
        {renderImageTypeButtonGroup()}
        {renderImageSelect()}
      </div>
      <div className="flex fixed bottom-0 w-full gray-200 border-t border-gray-100 bg-white px-8 py-4 justify-end">
        {renderButtonDone()}
      </div>
    </div>
  );
};

export default AccountEditPage;
