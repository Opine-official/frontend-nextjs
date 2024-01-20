import { Button } from "@/components/ui/button";
import useUser from "@/app/hooks/useUser";
import PostSettings from "./PostSettings";
import useEditor from "../hooks/useEditor";

const ActionsTray = () => {
  const { saveStory, isNewPost } = useEditor();

  return (
    <div className="fixed z-10 inset-x-0 bottom-0 bg-gray-200 p-4 flex justify-center items-center space-x-6 shadow-md">
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
