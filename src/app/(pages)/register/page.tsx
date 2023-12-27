import React from "react";
import RegisterCard from "./components/RegisterCard";

const Page = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="flex h-full absolute top-0 bottom-0 left-0 right-0">
        <div className="bg-black flex-[0.5]"></div>
        <div className="bg-white flex-1"></div>
      </div>
      <div className="relative ml-[25vw]">
        <RegisterCard />
      </div>
      <div className="absolute right-[20vw] text-center">
        <span className="text-4xl font-serif text-gray-900">
          &quot;Either write something worth reading <br />
          or do something worth writing.&quot;
        </span>
        <span className="text-xl font-medium mt-4 block">
          - Benjamin Franklin
        </span>
      </div>
    </section>
  );
};

export default Page;
