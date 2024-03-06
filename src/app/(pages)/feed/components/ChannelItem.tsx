import Link from "next/link";
import React from "react";

const ChannelItem = ({ channel }: any) => {
  return (
    <Link href={`/channel/${channel.name}`} className="">
      <div className="shadow-md p-4 mb-4 rounded-md h-[150px]">
        <h2 className="text-xl font-bold mb-2">{channel.name}</h2>
        <p className="text-gray-700 mb-2">{channel.description}</p>
        <p className="text-sm text-gray-500">
          Subscribers: {channel.subscriberCount}
        </p>
      </div>
    </Link>
  );
};

export default ChannelItem;
