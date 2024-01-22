"use client";
import React, { useEffect, useState } from "react";
import Thread from "./components/Thread";
import axiosInstance from "@/shared/helpers/axiosInstance";

type Props = {};

const Page = (props: Props) => {
  const [threads, setThreads] = useState<any>([]);

  async function fetchThreads() {
    try {
      const response = await axiosInstance.get("/threads/");
      console.log(response.data.threads);
      setThreads(response.data.threads);
    } catch (e) {}
  }

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="flex flex-col mt-10 gap-y-4 px-60 ml-10">
      {threads.length > 0 &&
        threads?.map((thread: any) => (
          <Thread
            key={thread._id}
            name={thread.user.name}
            bio="Code whisperer"
            title={thread.post.title}
            description={thread.post.description}
            profile={thread.user.profile}
          />
        ))}
    </div>
  );
};

export default Page;
