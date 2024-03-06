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
import ModifyCategoryForm from "./ModifyCategoryForm";

export const ModifyCategoryDialogue = ({ refreshData, category }: any) => {
  // console.log(category.name);

  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <FiEdit2 />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Modify category</DialogTitle>
          <DialogDescription>
            <ModifyCategoryForm
              refreshData={refreshData}
              category={category}
              setOpen={setOpen}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
