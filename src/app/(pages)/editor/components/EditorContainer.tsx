// @ts-nocheck
import "../styles/style.css";
import "../styles/article.css";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

const EditorContainer = ({ data, setData, setMetaData, metaData }) => {
  return (
    <div className="container">
      <Textarea
        className="px-8 text-4xl font-bold border-none focus-visible:ring-0"
        value={metaData.title}
        onChange={(e) =>
          setMetaData((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="What's the headline for your story?"
        style={{ resize: "none" }}
      />
      <Textarea
        className="mb-2 p-8 text-gray-600 text-2xl border-none focus-visible:ring-0 overflow-hidden"
        value={metaData.description}
        onChange={(e) =>
          setMetaData((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Give a brief summary of your article..."
        style={{ resize: "none" }}
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
