import { AiOutlineComment } from "react-icons/ai";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommentBox from "./CommentBox";
import { CommentProvider } from "../contexts/CommentContext";

type Props = {
  postId: string;
};

const CommentSection = ({ postId }: Props) => {
  return (
    <Sheet>
      <SheetTrigger>
        <AiOutlineComment size={24} />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Responses</SheetTitle>
          <SheetDescription>
            <CommentProvider>
              <CommentBox postId={postId} />
            </CommentProvider>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSection;
