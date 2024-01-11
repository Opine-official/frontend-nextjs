// @ts-nocheck
import "../styles/style.css";
import "../styles/article.css";
import Editor from "./Editor";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";

const ArticleContainer = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [metaData, setMetaData] = useState(null);
  const [data, setData] = useState(null);

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
      return {
        data: data.content,
        metaData: {
          title: data.title,
          description: data.description,
          tags: data.tags,
        },
      };
    } catch (error) {
      console.error(error);
      router.push("/feed");
    }
  }

  useEffect(() => {
    fetchArticle();
  }, []);

  const isLoading = !data || !metaData;

  if (isLoading) {
    return (
      <div className="container flex items-center space-x-4">
        <div className="px-8 mb-4 text-4xl font-bold space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="px-8 mb-4 text-4xl font-bold">{metaData?.title}</h1>
      <p className="mb-2 px-8 text-gray-600 text-2xl">
        {metaData?.description}
      </p>

      <div className="editor">
        {data && <Editor data={data} editorblock="editorjs-container" />}
      </div>
    </div>
  );
};

export default ArticleContainer;
