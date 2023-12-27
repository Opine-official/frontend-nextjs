import Image from "next/image";
import React from "react";
import AuthButtons from "@/shared/utils/AuthButtons";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center shadow">
      <div className="flex gap-x-[400px] items-center h-16">
        <div className="flex items-center w-[200px]">
          <span className="text-2xl font-bold">Opine</span>
          <Image
            src="/logo.png"
            alt="Opine Logo"
            width={24}
            height={24}
          ></Image>
        </div>

        <div className="w-[200px]">
          <ul className="flex gap-x-4">
            <li>
              <a href="#">My Feed</a>
            </li>
            <li>
              <a href="#">Threads</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>

        <div className="flex gap-x-3 w-[200px]">
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
