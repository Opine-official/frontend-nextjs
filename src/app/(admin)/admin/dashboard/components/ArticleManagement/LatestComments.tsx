import React from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  username: string;
  profile: null | string;
  userId: string;
  __v: number;
};

type Post = {
  _id: string;
  postId: string;
  title: string;
  description: string;
  user: string;
  tags: string[];
  slug: string;
  __v: number;
};

type Comment = {
  commentId: string;
  postId: string;
  content: string;
  user: User;
  post: Post;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  comments: Comment[];
};

const LatestComments = ({ comments }: Props) => {
  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-10">Latest Comments</h2>
      {comments?.map((comment) => (
        <div key={comment?.commentId}>
          <a
            className="text-lg mb-2"
            href={`/${comment?.post?.slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>{comment?.post?.title}</h2>
          </a>
          <p className="text-blue-400">{comment?.content}</p>
          <p>
            Posted on
            {new Date(comment?.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LatestComments;
