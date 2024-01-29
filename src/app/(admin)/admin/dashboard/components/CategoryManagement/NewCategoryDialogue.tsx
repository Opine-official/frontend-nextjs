import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewCategoryForm from "./NewCategoryForm";

export const NewCategoryDialogue = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>New Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Create new category</DialogTitle>
          <DialogDescription>
            <NewCategoryForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
