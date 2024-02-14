"use client";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";

import Navbar from "../components/Navbar";
import useUser from "../hooks/useUser";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  console.log(user);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
