import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/shared/helpers/axiosInstance";
import {
  CREATE_COMMENT,
  GET_COMMENTS_BY_POST,
} from "@/shared/helpers/endpoints";
import { useEffect, useState } from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

type Props = {
  name: string;
  postId: string;
  bio: string;
  title: string;
  description: string;
  profile: string | null;
  comments: any;
};

const Thread = ({
  name,
  postId,
  bio,
  title,
  description,
  profile,
  comments,
}: Props) => {
  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);

  async function saveComment() {
    try {
      const response = await axiosInstance.post(CREATE_COMMENT, {
        postId: postId,
        content: comment,
      });
      setComment("");
    } catch (error) {
      console.error(error);
    }
  }

  async function getComments() {
    try {
      const response = await axiosInstance.get(GET_COMMENTS_BY_POST(postId));
      console.log(response.data);
      setCommentsData(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="flex items-top">
      <AiOutlineUp className="cursor-pointer text-4xl p-2 m-2 bg-black text-white rounded-full mt-20" />
      <div className="max-w-xl bg-white p-6 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage alt={name} src={""} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-xs text-gray-500">{bio}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-lg font-bold">{title}</div>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4">
          <Input
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <Button onClick={saveComment} className="mt-2">
            Post
          </Button>
        </div>
        <div className="mt-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              {commentsData?.map((comment: any) => {
                return (
                  <div
                    key={comment._id}
                    className="flex gap-x-2 mt-4 items-center"
                  >
                    <Avatar className="rounded-full">
                      <AvatarImage
                        alt={comment.user.name}
                        src={
                          comment.user.profile
                            ? comment.user.profile
                            : "/placeholder.svg?height=32&width=32"
                        }
                        className="rounded-full"
                      />
                      <AvatarFallback className="rounded-full">
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3 flex flex-col w-full">
                      <span className="font-bold">{comment.user.name}</span>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <AiOutlineDown className="cursor-pointer text-4xl p-2 m-2 bg-black text-white rounded-full mt-20" />
    </div>
  );
};

export default Thread;
