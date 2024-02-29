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

export default function BanDialog({ report }: any) {
  async function banUser() {
    try {
      const response = await axiosInstance.post(BAN_USER, {
        username: report.reported,
      });
      console.log(response.data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  return (
    <AlertDialog>
      {report.status !== "Banned" ? (
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
            This action cannot be undone. This will permanently ban the account
            and remove your data from our servers.
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
