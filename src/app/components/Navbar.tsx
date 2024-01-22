import React from "react";
import AuthButtons from "@/shared/utils/AuthButtons";
import Link from "next/link";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center shadow">
      <div className="flex gap-x-[400px] items-center h-16">
        <Logo />
        <div className="w-[300px]">
          <ul className="flex gap-x-4">
            <li>
              <Link href="/feed">My Feed</Link>
            </li>
            <li>
              <Link href="/threads">Threads</Link>
            </li>
            <li>
              <Link href="/channels">Channels</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
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
