"use client";
import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import EditorContainer from "./components/EditorContainer";
import ActionsTray from "./components/ActionsTray";

const INITIAL_META_DATA = {
  title: "",
  description: "",
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
  return (
    <div>
      <Navbar />
      <EditorContainer
        data={data}
        setData={setData}
        setMetaData={setMetaData}
      />
      <ActionsTray metaData={metaData} data={data} />
    </div>
  );
}

export default Page;
