import React from "react";
import MyChannels from "./MyChannels";
import Recommended from "./Recommended";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="space-y-8">
      <MyChannels />
      <Recommended />
    </div>
  );
};

export default Sidebar;
