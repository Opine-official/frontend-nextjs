import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FiTrash2 } from "react-icons/fi";

import React from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useComments } from "../contexts/CommentContext";

type Props = {
  commentId: string;
};

const DeleteConfirmation = ({ commentId }: Props) => {
  const { deleteComment } = useComments();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(
        `/threads/comment/?commentId=${commentId}`
      );

      deleteComment(commentId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FiTrash2 className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
