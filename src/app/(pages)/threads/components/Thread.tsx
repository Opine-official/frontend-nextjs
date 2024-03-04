import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/shared/helpers/axiosInstance";
import {
  CREATE_COMMENT,
  CREATE_REPLY,
  GET_REPLIES,
  GET_THREAD_COMMENTS_BY_POST,
} from "@/shared/helpers/endpoints";
import { useEffect, useState } from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import useUser from "@/app/hooks/useUser";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  name: string;
  postId: string;
  bio: string;
  title: string;
  description: string;
  profile: string | null;
  comments: any;
};

const SingleComment = ({
  createdAt,
  content,
  name,
  commentId,
  userId,
  postId,
  isReply = false,
}: any) => {
  const date = createdAt;

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState<any[]>([]);

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
    <>
      <div className="flex gap-x-2 mt-4 items-center">
        <Avatar className="rounded-full">
          <AvatarImage
            alt={name}
            src={"/placeholder.svg?height=32&width=32"}
            className="rounded-full"
          />
          <AvatarFallback className="rounded-full">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="bg-gray-100 rounded-lg p-3 flex flex-col w-full">
          <span className="font-bold">{name}</span>
          <p className="text-gray-600">{content}</p>
        </div>
      </div>
      {!isReply && (
        <Button className="ml-14 my-2" variant="ghost" onClick={toggleReplyBox}>
          Show replies
        </Button>
      )}
      {showReplyBox && (
        <div className="space-y-2 pl-14">
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
              isReply={true}
            />
          ))}
        </div>
      )}
    </>
  );
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
  const [page, setPage] = useState(1);
  const [commentsData, setCommentsData] = useState<any[]>([]);
  const [hasMoreComments, setHasMoreComments] = useState(true);

  async function getComments() {
    try {
      const response = await axiosInstance.get(
        GET_THREAD_COMMENTS_BY_POST(postId, page)
      );
      console.log(response.data);
      setCommentsData((prevComments) => {
        const newComments = response.data.comments.filter(
          (newComment: any) =>
            !prevComments.some(
              (prevComment: any) =>
                prevComment.commentId === newComment.commentId
            )
        );
        return [...prevComments, ...newComments];
      });
      if (response.data.comments.length < 3) {
        setHasMoreComments(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveComment() {
    try {
      const response = await axiosInstance.post(CREATE_COMMENT, {
        postId: postId,
        content: comment,
      });
      setComment("");
      getComments();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getComments();
  }, [page]);

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
            value={comment}
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
                  <SingleComment
                    key={comment.commentId}
                    createdAt={comment.createdAt}
                    content={comment.content}
                    name={comment.user.name}
                    commentId={comment.commentId}
                    userId={comment.user.userId}
                    postId={comment.postId}
                  />
                );
              })}
            </div>
          </div>
          {hasMoreComments && (
            <Button
              variant="ghost"
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="mt-2"
            >
              Show More
            </Button>
          )}
        </div>
      </div>
      <AiOutlineDown className="cursor-pointer text-4xl p-2 m-2 bg-black text-white rounded-full mt-20" />
    </div>
  );
};

export default Thread;
