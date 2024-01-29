import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewChannelForm from "./NewChannelForm";

export const NewChannelDialogue = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>New channel</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Create new channel</DialogTitle>
          <DialogDescription>
            <NewChannelForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
