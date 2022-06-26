import { useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Image from "next/image";

import ImageDropzone from "components/ImageDropzone";
import NFTGallery from "components/NFTGallery";

import { useWallet } from "context/WalletContext";
import { useRouter } from "next/router";

const AccountEditPage: NextPage = () => {
  const { wallet } = useWallet();
  const [image, setImage] = useState<any>();
  const [imageType, setImageType] = useState<"nft" | "upload">("nft");
  const router = useRouter();

  const renderImageTypeButtonGroup = () => {
    return (
      <div className="flex w-full mb-8">
        <div className="flex mx-auto bg-gray-200 rounded-2xl overflow-hidden border-gray-200 p-1">
          <div
            className={`bg-gray-200 px-6 py-3 cursor-pointer ${
              imageType === "nft" &&
              "bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold rounded-xl"
            }`}
            onClick={() => {
              setImageType("nft");
            }}
          >
            NFTs
          </div>
          <div
            className={`bg-gray-200 px-6 py-3 cursor-pointer ${
              imageType === "upload" &&
              "bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold rounded-xl"
            }`}
            onClick={() => {
              setImageType("upload");
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
      <div className="flex justify-center items-center">
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
        className={`px-6 py-3 bg-gray-900 font-semibold text-white rounded-xl hover:bg-gray-800 active:scale-105 transition-all ease-in-out ${
          imageType === "nft" && ""
        }`}
        onClick={() => {
          console.log("Submit this image", image);
          // how to pass data via router?
          if (image) {
            router.push("/account");
          }
        }}
      >
        Set as ENS
      </button>
    );
  };

  return (
    <div className="flex">
      <div className="w-full flex flex-col max-w-4xl mx-auto">
        <div className="flex w-full">
          <div className="mx-auto mt-6 mb-8 text-3xl font-semibold">
            Choose a profile picture
          </div>
        </div>
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
