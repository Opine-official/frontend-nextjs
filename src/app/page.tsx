"use client";
import { Rings } from "react-loader-spinner";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import useUser from "./hooks/useUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading)
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#000"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </main>
    );

  if (user) {
    router.push("/feed");
    return;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* <Features /> */}
      {/* <Testimonials />
      <CallToAction /> */}
    </main>
  );
}
