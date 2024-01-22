import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { useComments } from "../contexts/CommentContext";

type Props = {
  commentId: string;
  content: string;
};

const EditDialog = ({ commentId, content }: Props) => {
  const [comment, setComment] = useState(content);
  const { updateComment } = useComments();

  const handleEdit = async () => {
    if (!comment.trim()) {
      return;
    }

    try {
      const response = await axiosInstance.put("/threads/comment", {
        commentId: commentId,
        content: comment.trim(),
      });
      const updateCommentValue: {
        commentId: string;
        content: string;
      } = {
        commentId: response.data.commentId,
        content: comment,
      };
      updateComment(updateCommentValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiEdit2 className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Editing comment</DialogTitle>
          <DialogDescription>
            <Textarea
              className="min-h-[100px]"
              id="comment"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button disabled={!comment.trim()} onClick={handleEdit}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
