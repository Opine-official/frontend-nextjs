import EditorContext from "../contexts/EditorContext";
import { useContext } from "react";

function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within a EditorProvider");
  }
  return context;
}

export default useEditor;
