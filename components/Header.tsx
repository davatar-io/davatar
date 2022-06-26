import React from "react";
import Image from "next/image";
import Link from "next/link";

import ConnectWalletButton from "components/ConnectWalletButton";

import logoGlyph from "../assets/LogoGlyph.png";
import logoColourSmall from "../assets/LogoColourSmall.svg";

import Button from "../components/Button";
import { useWallet } from "context/WalletContext";
import { useRouter } from "next/router";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image
          src={logoColourSmall}
          alt="davatar.io logo"
          layout="fixed"
          width={106}
          height={32}
        />
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
