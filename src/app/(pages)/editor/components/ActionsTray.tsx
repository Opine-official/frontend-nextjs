import { Button } from "@/components/ui/button";
import React from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import useUser from "@/app/hooks/useUser";

type ActionsTrayProps = {
  metaData: any;
  data: any;
};

const ActionsTray = ({ data, metaData }: ActionsTrayProps) => {
  const { user } = useUser();

  const userId = user?.id;

  async function savePost() {
    try {
      const res = await axiosInstance.post("/post/", {
        title: metaData.title,
        description: metaData.description,
        content: data,
        userId,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed z-10 inset-x-0 bottom-0 bg-gray-200 p-4 flex justify-center shadow-md">
      <Button className="mx-2" variant="outline" onClick={savePost}>
        Save as draft
      </Button>
      <Button className="mx-2" onClick={savePost}>
        Publish
      </Button>
    </div>
  );
};

export default ActionsTray;
