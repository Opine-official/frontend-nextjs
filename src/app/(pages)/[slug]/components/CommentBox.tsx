import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/shared/helpers/axiosInstance";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useUser from "@/app/hooks/useUser";
import EditDialog from "./EditDialog";
import { useComments } from "../contexts/CommentContext";
import DeleteConfirmation from "./DeleteConfirmation";
dayjs.extend(relativeTime);

type singleComment = {
  commentId: string;
  createdAt: string;
  content: string;
  name: string;
  userId: string;
};

const SingleComment = ({
  createdAt,
  content,
  name,
  commentId,
  userId,
}: singleComment) => {
  const date = dayjs(createdAt).fromNow();
  const { user } = useUser();
  const isLoggedIn = user.userId === userId;

  return (
    <div className="rounded-md border border-gray-200 px-4 py-2 shadow-sm dark:border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{date}</div>
      </div>
      <p className="mt-4">{content}</p>
      {isLoggedIn && (
        <div className="mt-4">
          <button className="mr-2">
            <EditDialog commentId={commentId} content={content} />
          </button>
          <button>
            <DeleteConfirmation commentId={commentId} />
          </button>
        </div>
      )}
    </div>
  );
};

type props = {
  postId: string;
};

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  profile: null | string;
  userId: string;
  __v: number;
}

interface Comment {
  commentId: string;
  postId: string;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export default function CommentBox({ postId }: props) {
  const [comment, setComment] = useState("");
  const { comments, setComments } = useComments();

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(
        `/threads/comments/?postId=${postId}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/threads/comment", {
        postId: postId,
        content: comment,
      });
      setComment("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Textarea
            className="min-h-[100px]"
            id="comment"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button disabled={!comment.trim()} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <SingleComment
            key={comment.commentId}
            commentId={comment.commentId}
            name={comment.user.name}
            content={comment.content}
            createdAt={comment.createdAt}
            userId={comment.user.userId}
          />
        ))}
      </div>
    </div>
  );
}
