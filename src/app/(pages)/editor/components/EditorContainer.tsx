// @ts-nocheck
import "../styles/style.css";
import "../styles/article.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from "./Editor";

const EditorContainer = ({ data, setData, setMetaData }) => {
  return (
    <div className="container">
      <Input
        className="px-8 text-4xl font-bold border-none focus-visible:ring-0"
        onChange={(e) =>
          setMetaData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="What's the headline for your story?"
      />
      <Textarea
        className="mb-2 p-8 text-gray-600 text-2xl border-none focus-visible:ring-0 overflow-hidden"
        onChange={(e) =>
          setMetaData((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Give a brief summary of your article..."
      />
      <div className="editor">
        <Editor
          data={data}
          onChange={setData}
          editorblock="editorjs-container"
        />
      </div>
    </div>
  );
};

export default EditorContainer;
