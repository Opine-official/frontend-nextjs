"use client";

import axiosInstance from "@/shared/helpers/axiosInstance";
// import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Opine - Admin",
//   description: "Dashboard for Opine Admins",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function verifyAdmin() {
    try {
      const res = await axiosInstance.get("/admin/verify");
    } catch (error) {
      console.error(error);
      router.push("/admin/");
    }
  }

  verifyAdmin();

  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
