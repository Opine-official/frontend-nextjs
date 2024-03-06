import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href="/feed">
      <div className="flex gap-x-[400px] items-center h-16">
        <div className="flex items-center w-[200px]">
          <span className="text-2xl font-bold">Opine</span>
          <Image src="/logo.png" alt="Opine Logo" width={24} height={24} />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
