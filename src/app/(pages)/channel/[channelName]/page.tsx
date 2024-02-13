"use client";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_CHANNEL, GET_POSTS_BY_CHANNEL } from "@/shared/helpers/endpoints";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PostItem from "./components/PostItem";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const channel = usePathname().split("/")[2];

  async function getChannelDetails() {
    try {
      const response = await axiosInstance.get(GET_CHANNEL(channel));
      console.log(response.data);
      // setChannelDetails(response.data.channel);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async function postsByChannel() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_POSTS_BY_CHANNEL(channel));
      console.log(response.data);
      setPosts(response.data.posts);
    } catch (e: unknown) {
      console.log(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    postsByChannel();
    getChannelDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts?.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-10">{channel}</h1>
      <Separator />

      <div className="mt-10 flex flex-col gap-y-6 items-center justify-center">
        {posts?.map((post: any) => {
          return <PostItem key={post.postId} {...post} />;
        })}
      </div>
    </>
  );
}
