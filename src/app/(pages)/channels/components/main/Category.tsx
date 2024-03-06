import React from "react";
import Channel from "./Channel";

type Props = {
  name: string;
  description: string;
  channels: {
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
  }[];
};

const Category = (category: Props) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-10">{category.name}</h1>
      <div className="flex  gap-x-10">
        {category.channels.map((channel) => (
          <Channel
            key={channel.name}
            name={channel.name}
            description={channel.description}
            posts={channel.posts}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
