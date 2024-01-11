import { Button } from "@/components/ui/button";
import React from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";

type ActionsTrayProps = {
  metaData: {
    title: string;
    description: string;
    tags: string[];
  };
  data: unknown;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionsTray = ({ data, metaData, setLoading }: ActionsTrayProps) => {
  const { user } = useUser();
  const router = useRouter();

  const userId = user?.id;

  async function savePost() {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/post/", {
        title: metaData.title,
        description: metaData.description,
        tags: metaData.tags,
        content: data,
        userId,
      });
      console.log(res);
      router.push(`/${res.data.slug}`);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="fixed z-10 inset-x-0 bottom-0 bg-gray-200 p-4 flex justify-center shadow-md">
      <Button disabled className="mx-2" variant="outline" onClick={savePost}>
        Save as draft
      </Button>
      <Button className="mx-2" onClick={savePost}>
        Publish
      </Button>
    </div>
  );
};

export default ActionsTray;
