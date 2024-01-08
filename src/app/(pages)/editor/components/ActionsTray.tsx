import { Button } from "@/components/ui/button";
import React from "react";

type ActionsTrayProps = {
  metaData: any;
  data: any;
};

const ActionsTray = ({ data, metaData }: ActionsTrayProps) => {
  return (
    <div className="fixed z-10 inset-x-0 bottom-0 bg-gray-200 p-4 flex justify-center shadow-md">
      <Button
        className="mx-2"
        variant="outline"
        onClick={() => {
          alert(JSON.stringify(metaData));
        }}
      >
        Save as draft
      </Button>
      <Button
        className="mx-2"
        onClick={() => {
          alert(JSON.stringify(data));
        }}
      >
        Publish
      </Button>
    </div>
  );
};

export default ActionsTray;
