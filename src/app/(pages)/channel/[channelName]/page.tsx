"use client";
import axiosInstance from "@/shared/helpers/axiosInstance";
import {
  GET_CHANNEL,
  GET_POSTS_BY_CHANNEL,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
} from "@/shared/helpers/endpoints";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PostItem from "./components/PostItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useUser from "@/app/hooks/useUser";
import { Rings } from "react-loader-spinner";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [channelDetails, setChannelDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isSubscribeActive, setIsSubscribeActive] = useState(false);

  const { user } = useUser();
  const userId = user?.userId;

  const channelName = usePathname().split("/")[2];

  async function getChannelDetails() {
    try {
      const response = await axiosInstance.get(
        GET_CHANNEL(channelName, userId)
      );
      console.log(response.data);
      // setChannelDetails(response.data.channelName);
      setChannelDetails(response.data);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async function postsByChannel() {
    try {
      const response = await axiosInstance.get(
        GET_POSTS_BY_CHANNEL(channelName)
      );
      console.log(response.data);
      setPosts(response.data.posts);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async function getDetailsAndPost() {
    setLoading(true);
    try {
      await getChannelDetails();
      await postsByChannel();
    } catch (e: unknown) {
      console.log(e);
    }
    setLoading(false);
  }

  async function subscribeChannel() {
    setIsSubscribeActive(true);
    try {
      const response = await axiosInstance.post(SUBSCRIBE_CHANNEL, {
        userId: userId,
        channelId: channelDetails.channel.channelId,
        channelName: channelDetails.channel.name,
      });

      setChannelDetails((prev: any) => {
        return {
          ...prev,
          channel: {
            ...prev.channel,
            subscriberCount: prev.channel.subscriberCount + 1,
          },
          isUserSubscribed: true,
        };
      });
    } catch (e: unknown) {
      console.error(e);
    }
    setIsSubscribeActive(false);
  }

  async function unsubscribeChannel() {
    setIsSubscribeActive(true);
    try {
      const response = await axiosInstance.delete(
        UNSUBSCRIBE_CHANNEL(userId, channelDetails.channel.channelId)
      );

      setChannelDetails((prev: any) => {
        return {
          ...prev,
          channel: {
            ...prev.channel,
            subscriberCount: prev.channel.subscriberCount - 1,
          },
          isUserSubscribed: false,
        };
      });
    } catch (e: unknown) {
      console.error(e);
    }
    setIsSubscribeActive(false);
  }

  useEffect(() => {
    getDetailsAndPost();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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

  if (posts?.length === 0) {
    return <div>No posts found</div>;
  }

  // console.log(channel);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center mt-10">
          {channelDetails?.channel?.name}
        </h1>
        <p className="text-center my-2">
          {channelDetails?.channel?.description}
        </p>
        <span className="text-center my-2">
          {channelDetails?.channel?.subscriberCount === 1
            ? "1 subscriber"
            : `${channelDetails?.channel?.subscriberCount} subscribers`}
        </span>
        <Button
          variant={channelDetails.isUserSubscribed ? "outline" : "default"}
          disabled={isSubscribeActive}
          onClick={
            channelDetails.isUserSubscribed
              ? unsubscribeChannel
              : subscribeChannel
          }
          className="text-center my-4"
        >
          {channelDetails.isUserSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </div>
      <Separator />

      <div className="mt-10 flex flex-col gap-y-6 items-center justify-center mb-10">
        {posts?.map((post: any) => {
          return <PostItem key={post.postId} {...post} />;
        })}
      </div>
    </>
  );
}
