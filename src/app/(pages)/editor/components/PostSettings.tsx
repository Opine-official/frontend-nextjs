import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdOutlineSettings } from "react-icons/md";
import PostSettingsForm from "./PostSettingsForm";

const PostSettings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MdOutlineSettings className="cursor-pointer" size={28} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Post settings</DialogTitle>
          <DialogDescription>
            <PostSettingsForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostSettings;
