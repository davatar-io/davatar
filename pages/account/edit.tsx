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
      <div className="btn-group">
        <button
          className={`btn ${imageType === "nft" && "btn-active"}`}
          onClick={() => {
            setImageType("nft");
          }}
        >
          NFTs
        </button>
        <button
          className={`btn ${imageType === "upload" && "btn-active"}`}
          onClick={() => {
            setImageType("upload");
          }}
        >
          Upload
        </button>
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
        className={`btn ${imageType === "nft" && "btn-active"}`}
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
    <div>
      <p>edit stuff</p>
      {renderImageTypeButtonGroup()}
      {renderImageSelect()}
      {renderButtonDone()}
    </div>
  );
};

export default AccountEditPage;
