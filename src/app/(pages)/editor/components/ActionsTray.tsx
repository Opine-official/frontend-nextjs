import { Button } from "@/components/ui/button";
import React from "react";
import useUser from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import PostSettings from "./PostSettings";
import { savePostHelper, updatePostHelper } from "../utils/helpers";

type ActionsTrayProps = {
  metaData: {
    title: string;
    description: string;
    tags: string[];
  };
  data: unknown;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string | null;
};

const ActionsTray = ({
  data,
  metaData,
  setLoading,
  slug,
}: ActionsTrayProps) => {
  const { user } = useUser();
  const router = useRouter();

  const userId = user?.id;

  async function savePost() {
    setLoading(true);
    try {
      const res = await savePostHelper(data, metaData, userId);
      router.push(`/${res.data.slug}`);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function updatePost() {
    setLoading(true);
    try {
      const res = await updatePostHelper(data, metaData, userId, slug);
      console.log(res);
      router.push(`/${res.data.slug}`);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="fixed z-10 inset-x-0 bottom-0 bg-gray-200 p-4 flex justify-center items-center space-x-6 shadow-md">
      <Button disabled variant="outline" onClick={savePost}>
        Save as draft
      </Button>
      {!slug ? (
        <Button onClick={savePost}>Publish</Button>
      ) : (
        <Button onClick={updatePost}>Update</Button>
      )}
      <PostSettings />
    </div>
  );
};

export default ActionsTray;
