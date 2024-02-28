import { Button } from "@/components/ui/button";
import { FcIdea } from "react-icons/fc";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SiOpenai } from "react-icons/si";

export const BrainstormIdeas = ({ metaData }: any) => {
  const { title, description, tags } = metaData;

  return (
    <div className="my-2">
      <h3 className="text-lg font-bold mb-2">Title</h3>
      <p className="mb-2">{title}</p>
      <h3 className="text-lg font-bold mb-2">Description</h3>
      <p className="mb-2">{description}</p>

      <Button className="mt-2" variant="outline">
        Brainstorm ideas <FcIdea />
      </Button>
    </div>
  );
};

export const OpenAiDialog = ({ metaData }: any) => {
  return (
    <Sheet>
      <SheetTrigger>
        <SiOpenai className="cursor-pointer" size={28} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>AI brainstorm</SheetTitle>
          <SheetDescription>
            <BrainstormIdeas metaData={metaData} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
