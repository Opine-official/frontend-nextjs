"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import FeedItem from "./components/FeedItem";
import TrendingArticles from "./components/TrendingArticles";
import { Separator } from "@/components/ui/separator";
import { Rings } from "react-loader-spinner";
import TopAuthors from "./components/TopAuthors";

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

const FeedPage: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchFeedPosts() {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/feed/");
      setFeedPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFeedPosts();
  }, []);

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

  const trendingPosts = feedPosts
    .slice(0, 3)
    .map((post) => ({ title: post.title, slug: post.slug }));

  return (
    <div className="flex justify-center mt-10 min-h-screen">
      <div className="flex gap-x-28">
        <div className="flex flex-col gap-y-10 items-center flex-grow-2">
          {feedPosts.map((post) => (
            <FeedItem key={post.postId} {...post} />
          ))}
        </div>

        <Separator orientation="vertical" className="-mr-20" />
        <div className="sidebar space-y-6 flex-grow">
          <TrendingArticles posts={trendingPosts} />
          <TopAuthors authors={[]} />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
