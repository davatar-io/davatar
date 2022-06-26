import React from "react";
import Image from "next/image";
import Link from "next/link";

import ConnectWalletButton from "components/ConnectWalletButton";

import logoGlyph from "../assets/LogoGlyph.png";
import Button from "../components/Button";
import { useWallet } from "context/WalletContext";
import { useRouter } from "next/router";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <div className="flex items-center">
          <Image
            src={logoGlyph}
            alt="davatar.io logo"
            layout="fixed"
            width={32}
            height={32}
          />
          <div className="font-semibold text-xl pl-1">avatar.io</div>
        </div>
      </a>
    </Link>
  );
};

const Header = () => {
  const { wallet } = useWallet();
  const router = useRouter();

  return (
    <div className="flex h-20 px-10 justify-between items-center">
      {router.pathname !== "/" ? <Logo /> : <div></div>}
      <ConnectWalletButton />
    </div>
  );
};

export default Header;
