import React from "react";
import EditorContextProvider from "./providers/EditorContextProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <EditorContextProvider>{children}</EditorContextProvider>
    </div>
  );
};

export default layout;
