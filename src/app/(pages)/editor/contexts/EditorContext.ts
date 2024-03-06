import { Dispatch, SetStateAction, createContext } from "react";

type EditorContext = any;

const EditorContext = createContext<EditorContext>({} as EditorContext);

export default EditorContext;
