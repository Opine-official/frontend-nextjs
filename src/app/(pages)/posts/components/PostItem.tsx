import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axiosInstance from "@/shared/helpers/axiosInstance";
import PostDeleteConfirmation from "./PostDeleteConfirmation";

type Props = {
  postId: string;
  title: string;
  description: string;
  user: {
    name: string;
    email: string;
    username: string;
    bio?: string; // Not yet implemented
  };
  tags: string[];
  slug: string;
  refetchFeedPosts: () => void;
};

const PostItem = ({
  postId,
  title,
  description,
  user,
  tags,
  slug,
  refetchFeedPosts,
}: Props) => {
  async function handleDelete() {
    try {
      const response = await axiosInstance.delete(`/post/?slug=${slug}`);
      refetchFeedPosts();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card className="w-[800px] ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="space-x-2">
          <Button
            size="sm"
            className="text-xs  hover:shadow-lg transition duration-500"
            onClick={() => window.open(`/editor?slug=${slug}`)}
          >
            <FaEdit />
          </Button>
          {/* <Button
            size="sm"
            className="text-xs hover:shadow-lg transition duration-500"
            onClick={handleDelete}
          >
            <MdDelete />
          </Button> */}
          <PostDeleteConfirmation handleDelete={handleDelete} />
        </div>
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
