"use client";
import { useEffect, useState } from "react";
import EditorContainer from "./components/EditorContainer";
import ActionsTray from "./components/ActionsTray";
import { ProgressBar } from "react-loader-spinner";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useSearchParams, useRouter } from "next/navigation";

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
  const slug = useSearchParams().get("slug") ?? null;

  const router = useRouter();

  const [metaData, setMetaData] = useState(INITIAL_META_DATA);
  const [data, setData] = useState(INITIAL_DATA);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchArticle() {
    try {
      const res = await axiosInstance.get(`/post/?slug=${slug}`);
      console.log(res.data);
      const data = res.data;
      setMetaData({
        title: data.title,
        description: data.description,
        tags: data.tags,
      });
      setData(data.content);
    } catch (error) {
      console.error(error);
      router.push("/posts");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (slug) {
      fetchArticle();
    } else {
      setLoading(false);
    }
  }, []);

  if (saving || loading) {
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
          {saving
            ? "Baking your article into the database"
            : "Good things take time"}
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
        metaData={metaData}
      />
      <ActionsTray
        metaData={metaData}
        data={data}
        setLoading={setSaving}
        slug={slug}
      />
    </div>
  );
}

export default Page;
