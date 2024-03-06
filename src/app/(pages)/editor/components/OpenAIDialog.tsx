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
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GENERATE_OPENAI_COMPLETIONS } from "@/shared/helpers/endpoints";
import { useState } from "react";

export const BrainstormIdeas = ({ metaData }: any) => {
  const { title, description, tags } = metaData;
  const [brainStorming, setBrainStorming] = useState(false);
  const [responseContent, setResponseContent] = useState("");

  async function brainstorm() {
    setBrainStorming(true);
    try {
      const response = await axiosInstance.post(GENERATE_OPENAI_COMPLETIONS, {
        prompt: `Title: ${title}\nDescription: ${description}\n\nPlease provide an outline for the article based on the title and description. Also, suggest some key points or arguments that the user could explore in the article.`,
      });

      console.log(response.data);
      setResponseContent(response.data);
    } catch (error: unknown) {
      console.log(error);
    }

    setBrainStorming(false);
  }

  return (
    <div className="my-2">
      <h3 className="text-lg font-bold mb-2">Title</h3>
      <p className="mb-2">{title}</p>
      <h3 className="text-lg font-bold mb-2">Description</h3>
      <p className="mb-2">{description}</p>

      <Button
        disabled={brainStorming}
        onClick={brainstorm}
        className="mt-2"
        variant="outline"
      >
        Brainstorm ideas <FcIdea />
      </Button>
      <h3 className="text-lg font-bold mt-6">Brainstorming Results</h3>
      <div className="h-[400px] mt-10 overflow-y-scroll">{`${responseContent}`}</div>
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
