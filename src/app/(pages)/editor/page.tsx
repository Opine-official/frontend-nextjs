"use client";
import EditorContainer from "./components/EditorContainer";
import ActionsTray from "./components/ActionsTray";
import { ProgressBar } from "react-loader-spinner";
import useEditor from "./hooks/useEditor";

function Page() {
  const { saving, loading } = useEditor();

  if (saving || loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-200 transition-opacity duration-500 ease-in-out opacity-100">
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          borderColor="#000000"
          barColor="#000000"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <p className="mt-0 text-2xl text-gray-700">
          {saving
            ? "Baking your article into the database"
            : "Good things take time"}
          <span className="text-4xl animate-ping">.</span>
          <span className="text-4xl animate-ping delay-150">.</span>
          <span className="text-4xl animate-ping delay-300">.</span>
        </p>
      </div>
    );
  }

  return (
    <>
      <EditorContainer />
      <ActionsTray />
    </>
  );
}

export default Page;
