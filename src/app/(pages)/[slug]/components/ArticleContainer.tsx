// @ts-nocheck
import "../styles/style.css";
import "../styles/article.css";
import Editor from "./Editor";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        author: data.user,
        postedOn: data.createdAt,
        updatedOn: data.updatedAt,
      });
      setData(data.content);
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

  function trimName(name: string): string {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  }

  const trimmedName = trimName(metaData.author.name);

  return (
    <div className="container">
      <div className="pl-8 mb-6 flex items-center gap-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{trimmedName}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm"> {metaData.author.name}</span>
          <span className="text-gray-600 text-xs">
            {new Date(metaData.updatedOn).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
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
