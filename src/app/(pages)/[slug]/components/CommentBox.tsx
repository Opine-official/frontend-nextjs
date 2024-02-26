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
import {
  CREATE_COMMENT,
  CREATE_REPLY,
  GET_COMMENTS_BY_POST,
  GET_REPLIES,
} from "@/shared/helpers/endpoints";
dayjs.extend(relativeTime);

type singleComment = {
  commentId: string;
  createdAt: string;
  content: string;
  name: string;
  userId: string;
  postId: string;
};

const SingleComment = ({
  createdAt,
  content,
  name,
  commentId,
  userId,
  postId,
}: singleComment) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState<any[]>([]);

  const date = dayjs(createdAt).fromNow();
  const { user } = useUser();
  const isLoggedInCurrentUser = user?.userId === userId;
  const isLoggedIn = !!user?.userId;

  const toggleReplyBox = () => {
    setShowReplyBox(!showReplyBox);
  };

  const fetchReplies = async () => {
    try {
      const response = await axiosInstance.get(GET_REPLIES(commentId));

      console.log(response.data);
      setReplies(response.data.replies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!reply.trim()) {
      return;
    }

    try {
      const response = await axiosInstance.post(CREATE_REPLY(commentId), {
        postId: postId,
        userId: user.userId,
        content: reply,
      });
      setReply("");
      fetchReplies();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  return (
    <div className="rounded-md border border-gray-200 px-4 py-2 shadow-sm dark:border-gray-800">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{date}</div>
      </div>
      <p className="mt-4">{content}</p>

      <div className="mt-4">
        {isLoggedInCurrentUser && (
          <>
            <button className="mr-2">
              <EditDialog commentId={commentId} content={content} />
            </button>
            <button>
              <DeleteConfirmation commentId={commentId} />
            </button>
          </>
        )}

        <Button
          className={isLoggedInCurrentUser ? "" : "p-0"}
          variant="ghost"
          onClick={toggleReplyBox}
        >
          Show replies
        </Button>
      </div>

      {showReplyBox && (
        <div className="space-y-2">
          {isLoggedIn && (
            <>
              <Textarea
                className="min-h-[100px]"
                id="comment"
                placeholder="Enter your comment"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                disabled={!reply.trim()}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </>
          )}
          {replies.map((comment) => (
            <SingleComment
              key={comment.commentId}
              commentId={comment.commentId}
              name={comment.user.name}
              content={comment.content}
              createdAt={comment.createdAt}
              userId={comment.user.userId}
              postId={postId}
            />
          ))}
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

export default function CommentBox({ postId }: props) {
  const [comment, setComment] = useState("");
  const { comments, setComments } = useComments();

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(GET_COMMENTS_BY_POST(postId));
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
      const response = await axiosInstance.post(CREATE_COMMENT, {
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
            postId={postId}
          />
        ))}
      </div>
    </div>
  );
}
