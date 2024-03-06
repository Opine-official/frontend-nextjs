"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { Rings } from "react-loader-spinner";
import PostItem from "./PostItem";
import useUser from "@/app/hooks/useUser";

interface PostData {
  postId: string;
  title: string;
  description: string;
  user: {
    name: string;
    email: string;
    username: string;
  };
  tags: string[];
  slug: string;
}

const PostList: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const userId = user?.userId;

  async function fetchFeedPosts() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/post/getPostsByUser?userId=${userId}`
      );

      console.log(response.data);
      setFeedPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const refetchFeedPosts: () => void = () => refetchFeedPosts();

  useEffect(() => {
    fetchFeedPosts();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#000"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10 items-center py-10">
      {feedPosts?.map((post) => (
        <PostItem
          key={post.postId}
          {...post}
          refetchFeedPosts={refetchFeedPosts}
        />
      ))}
    </div>
  );
};

export default PostList;
