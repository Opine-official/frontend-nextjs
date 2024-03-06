import { Button } from "@/components/ui/button";
import PostSettings from "./PostSettings";
import useEditor from "../hooks/useEditor";
import { OpenAiDialog } from "./OpenAIDialog";

const ActionsTray = () => {
  const { saveStory, isNewPost, metaData } = useEditor();
  console.log(metaData);

  return (
    <div className="fixed z-10 inset-x-0 bottom-0 bg-gray-200 p-4 flex justify-center items-center space-x-6 shadow-md">
      <OpenAiDialog metaData={metaData} />
      <Button variant="outline" onClick={() => saveStory({ isDraft: true })}>
        Save as draft
      </Button>
      {isNewPost ? (
        <Button onClick={() => saveStory({ isDraft: false })}>Publish</Button>
      ) : (
        <Button onClick={() => saveStory({ isDraft: false })}>
          Publish changes
        </Button>
      )}
      <PostSettings />
    </div>
  );
};

export default ActionsTray;
