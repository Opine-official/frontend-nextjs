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
import axiosInstance from "@/shared/helpers/axiosInstance";
import { DELETE_POST } from "@/shared/helpers/endpoints";

import React from "react";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  refreshData: any;
  report: any;
};

function DeletePostAlert({ refreshData, report }: Props) {
  async function deletePost() {
    try {
      const response = await axiosInstance.delete(DELETE_POST(report.slug));
      refreshData();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <FiTrash2 className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deletePost}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePostAlert;
