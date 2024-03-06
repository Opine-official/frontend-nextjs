// @ts-nocheck
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import ImageTool from "@editorjs/image";
import VideoTool from "@weekwood/editorjs-video";

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: List,
  header: {
    class: Header,
  },
  delimiter: Delimiter,
  link: Link,
  ImageTool: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "https://opine/api/post/uploadImage",
        byUrl: "http://localhost:3000/api/fetchUrl",
      },
    },
  },
  VideoTool: {
    class: VideoTool,
    config: {
      endpoints: {
        byFile: "https://opine/api/post/uploadVideo",
        byUrl: "http://localhost:3000/api/fetchUrl",
      },
      player: {
        controls: true,
        autoplay: false,
      },
    },
  },
};
