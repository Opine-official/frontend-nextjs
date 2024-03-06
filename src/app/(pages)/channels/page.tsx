import React from "react";
import CategoryContainer from "./components/main/index";
import { Separator } from "@/components/ui/separator";
import Sidebar from "./components/Sidebar";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex justify-center gap-x-4 mt-10 min-h-screen pb-10">
      <div className="flex gap-x-10">
        <CategoryContainer />
        <Separator orientation="vertical" />
        <Sidebar />
      </div>
    </div>
  );
};

export default page;
