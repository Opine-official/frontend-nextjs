"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import EditorContainer from "./components/EditorContainer";
import ActionsTray from "./components/ActionsTray";
import { ProgressBar } from "react-loader-spinner";

const INITIAL_META_DATA = {
  title: "",
  description: "",
  tags: ["untagged"],
};

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "Start writing..",
      },
    },
  ],
};

function Page() {
  const [metaData, setMetaData] = useState(INITIAL_META_DATA);
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-200 transition-opacity duration-500 ease-in-out opacity-100">
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          borderColor="#000000"
          barColor="#000000"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="mt-0 text-2xl text-gray-700">
          Baking your article into the database
          <span className="text-4xl animate-ping">.</span>
          <span className="text-4xl animate-ping delay-150">.</span>
          <span className="text-4xl animate-ping delay-300">.</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <EditorContainer
        data={data}
        setData={setData}
        setMetaData={setMetaData}
      />
      <ActionsTray metaData={metaData} data={data} setLoading={setLoading} />
    </div>
  );
}

export default Page;
