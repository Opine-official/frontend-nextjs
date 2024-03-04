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
import { Button } from "@/components/ui/button";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { BAN_USER } from "@/shared/helpers/endpoints";
import { useState } from "react";

export default function BanDialog({ report, refreshData }: any) {
  const [isBanned, setIsBanned] = useState(report.status === "Banned");

  async function banUser() {
    try {
      const response = await axiosInstance.post(BAN_USER, {
        username: report.reported,
      });
      console.log(response.data);
      refreshData();
      setIsBanned(true);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  return (
    <AlertDialog>
      {!isBanned ? (
        <AlertDialogTrigger>
          <Button>Ban User</Button>
        </AlertDialogTrigger>
      ) : (
        <Button disabled>Banned</Button>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently ban the account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={banUser}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
