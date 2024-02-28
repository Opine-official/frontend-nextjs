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
import { DELETE_CATEGORY } from "@/shared/helpers/endpoints";

import React from "react";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  refreshData: any;
  category: any;
};

function DeleteCategoryAlert({ refreshData, category }: any) {
  async function deleteCategory() {
    try {
      const response = await axiosInstance.delete(DELETE_CATEGORY(category.id));
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
            This action cannot be undone. This will permanently delete the
            category. Nothing will happen to the channels.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteCategory}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteCategoryAlert;
