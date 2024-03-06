import { ReactNode, createContext, useContext, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  profile: null | string;
  userId: string;
  __v: number;
}

export interface Comment {
  commentId: string;
  postId: string;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

type CommentContextType = {
  comments: Comment[];
  updateComment: (updatedComment: {
    commentId: string;
    content: string;
  }) => void;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  deleteComment: (commentId: string) => void;
};

export const CommentContext = createContext<CommentContextType | undefined>(
  undefined
);

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComments must be used within a CommentProvider");
  }
  return context;
};

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const updateComment = (updatedComment: {
    commentId: string;
    content: string;
  }) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === updatedComment.commentId
          ? { ...comment, content: updatedComment.content }
          : comment
      )
    );
  };

  const deleteComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.commentId !== commentId)
    );
  };

  return (
    <CommentContext.Provider
      value={{ comments, setComments, updateComment, deleteComment }}
    >
      {children}
    </CommentContext.Provider>
  );
};
