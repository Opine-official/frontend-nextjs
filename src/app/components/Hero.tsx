"use client";
import React from "react";
import AuthButtons from "@/shared/utils/AuthButtons";

const Hero: React.FC = () => {

  return (
    <section className="py-40 flex justify-center">
      <div className="flex flex-col justify-center items-center gap-y-8">
        <h1 className="text-4xl font-semibold text-black mb-4">
          Your Gateway to Expression
        </h1>
        <p className="text-black text-lg mb-8 max-w-2xl text-center">
          Opine brings together insightful minds and uncensored ideas driving
          meaningful discourse. Find your voice.
        </p>
        <div className="flex gap-x-3">
          <AuthButtons />
        </div>
      </div>
    </section>
  );
};

export default Hero;
