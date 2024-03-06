import React from "react";
import Post from "./Post";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  description: string;
  posts: {
    title: string;
    description: string;
    slug: string;
    user: {
      name: string;
      username: string;
      bio?: string; // Not yet implemented
      profile?: string;
    };
  }[];
};

const Channel = ({ name, description, posts }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Badge className="text-sm py-2 font-thin w-[120px]">{`#${name}`}</Badge>
      <div className="flex gap-x-4">
        {posts.map((post) => (
          <Post
            key={post.slug}
            title={post.title}
            description={post.description}
            slug={post.slug}
            user={post.user}
          />
        ))}
      </div>
    </div>
  );
};

export default Channel;
