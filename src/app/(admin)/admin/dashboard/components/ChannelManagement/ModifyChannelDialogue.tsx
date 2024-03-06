import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import ModifyChannelForm from "./ModifyChannelForm";

export const ModifyChannelDialogue = ({ refreshData, channel }: any) => {
  // console.log(channel.name);

  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <FiEdit2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Modify channel</DialogTitle>
          <DialogDescription>
            <ModifyChannelForm
              refreshData={refreshData}
              channel={channel}
              setOpen={setOpen}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
