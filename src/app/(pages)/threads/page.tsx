"use client";
import React, { useEffect, useState } from "react";
import Thread from "./components/Thread";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_THREADS } from "@/shared/helpers/endpoints";

type Props = {};

const Page = (props: Props) => {
  const [threads, setThreads] = useState<any>([]);

  async function fetchThreads() {
    try {
      const response = await axiosInstance.get(GET_THREADS);
      console.log(response.data.threads);
      setThreads(response.data.threads);
    } catch (e) {}
  }

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="bg-[#f5f5f5]">
      <div className="flex flex-col items-center py-10 gap-y-4 px-60">
        {threads?.length > 0 &&
          threads?.map((thread: any) => (
            <Thread
              key={thread?._id}
              postId={thread?.postId}
              name={thread?.user?.name}
              bio="Code whisperer"
              title={thread?.post?.title}
              description={thread?.post?.description}
              profile={thread?.user?.profile}
              comments={thread.comments}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
