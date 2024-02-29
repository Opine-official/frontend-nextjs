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
import { DELETE_CHANNEL } from "@/shared/helpers/endpoints";

import React from "react";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  refreshData: any;
  channel: any;
};

function DeleteChannelAlert({ refreshData, channel }: any) {
  async function deleteChannel() {
    try {
      const response = await axiosInstance.delete(DELETE_CHANNEL(channel.id));
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
            channel. Nothing will happen to the categories.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteChannel}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteChannelAlert;
