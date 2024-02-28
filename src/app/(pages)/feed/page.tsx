"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import FeedItem from "./components/FeedItem";
import TrendingArticles from "./components/TrendingArticles";
import { Separator } from "@/components/ui/separator";
import { Rings } from "react-loader-spinner";
import TopAuthors from "./components/TopAuthors";
import { GET_FEED } from "@/shared/helpers/endpoints";
import useUser from "@/app/hooks/useUser";
import ChannelItem from "./components/ChannelItem";

interface PostData {
  postId: string;
  title: string;
  description: string;
  user: {
    profile: string;
    name: string;
    email: string;
    username: string;
  };
  tags: string[];
  slug: string;
  postedOn: string;
}

const FeedPage: React.FC = () => {
  const [feedPosts, setFeedPosts] = useState<PostData[]>([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const userId = user?.userId;

  async function fetchChannels() {
    try {
      const response = await axiosInstance.get("/channel/channels");
      console.log(response.data);
      setChannels(response.data.channels);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFeedPosts() {
    setLoading(true);
    try {
      const response = await axiosInstance.get(GET_FEED(userId));
      setFeedPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFeedPosts();
    fetchChannels();
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
    <div className="flex justify-center mt-10 min-h-screen pb-10">
      <div className="flex gap-x-28">
        <div className="flex flex-col gap-y-10 items-center flex-grow-2">
          {feedPosts.length === 0 && (
            <div className="flex flex-col items-center space-y-10 w-[800px]">
              <div className="text-center">
                <h1 className="text-3xl font-bold">No posts yet</h1>
                <p className="text-gray-500">
                  Start following channels to start seeing posts
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {channels.map((channel: any) => (
                  <ChannelItem key={channel.channelId} channel={channel} />
                ))}
              </div>
            </div>
          )}

          {feedPosts.map((post) => (
            <FeedItem key={post.postId} {...post} />
          ))}
        </div>

        <Separator orientation="vertical" className="-mr-20" />
        <div className="sidebar space-y-6 flex-grow">
          <TrendingArticles posts={trendingPosts} />
          <TopAuthors />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
