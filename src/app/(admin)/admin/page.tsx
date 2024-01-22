import React from "react";
import AdminCard from "./components/AdminCard";

const Page = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="flex h-full absolute top-0 bottom-0 left-0 right-0">
        <div className="bg-rose-600 flex-[0.5]"></div>
        <div className="bg-white flex-1"></div>
      </div>
      <div className="relative ml-[25vw]">
        <AdminCard />
      </div>
      <div className="absolute right-[20vw] text-center">
      <span className="text-4xl font-serif text-gray-900">
          &quot;Responsibility walks hand in hand <br />with capacity and power.&quot;
        </span>
        <span className="text-xl font-medium mt-4 block">
            - J. G. Holland
        </span>
      </div>
    </section>
  );
};

export default Page;
