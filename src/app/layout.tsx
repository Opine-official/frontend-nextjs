import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import UserProvider from "./providers/UserProvider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opine",
  description: "Your Gateway to Expression",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
