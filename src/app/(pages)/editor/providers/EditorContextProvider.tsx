"use client";
import { useSearchParams, useRouter } from "next/navigation";
import EditorContext from "../contexts/EditorContext";
import { useState, useEffect } from "react";
import axiosInstance from "@/shared/helpers/axiosInstance";
import useUser from "@/app/hooks/useUser";
import { Tag } from "@/components/tag/tag-input";
import { toast } from "sonner";

const INITIAL_META_DATA = {
  title: "",
  description: "",
  tags: ["untagged"],
};

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "Start writing..",
      },
    },
  ],
};

const EditorContextProvider = ({ children }: any) => {
  const { user, isLoading } = useUser();
  const userId = user?.userId;

  const slug = useSearchParams().get("slug") ?? null;
  const isNewPost = slug === null;

  const router = useRouter();

  if (!isLoading && !userId) {
    router.push("/");
  }

  const [metaData, setMetaData] = useState(INITIAL_META_DATA);
  const [data, setData] = useState(INITIAL_DATA);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchStory() {
    try {
      const res = await axiosInstance.get(`/post/?slug=${slug}`);
      console.log(res.data);
      const data = res.data;
      setMetaData({
        title: data.title,
        description: data.description,
        tags: data.tags,
      });
      setData(data.content);
    } catch (error) {
      console.error(error);
      router.push("/posts");
    }
    setLoading(false);
  }

  type context = {
    isDraft: boolean;
  };
  function validatePost() {
    const titleTrimmed = metaData.title.trim();
    const descriptionTrimmed = metaData.description.trim();

    if (titleTrimmed === "" || descriptionTrimmed === "") {
      return false;
    }

    return true;
  }

  async function createPost(isDraft: boolean) {
    if (!validatePost()) {
      toast("Operation failed", {
        description: "Title and description required",
        action: {
          label: "Close",
          onClick: () => console.log("Closing.."),
        },
      });
      return;
    }

    try {
      const res = await axiosInstance.post("/post/", {
        title: metaData.title.trim(),
        description: metaData.description.trim(),
        tags: metaData.tags,
        content: data,
        userId,
        isDraft: isDraft,
      });
      console.log(res.data);
      isDraft ? router.push("/posts") : router.push(`/${res.data.slug}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function updatePost(isDraft: boolean) {
    try {
      const res = await axiosInstance.put(`/post/?slug=${slug}`, {
        title: metaData.title,
        description: metaData.description,
        tags: metaData.tags,
        content: data,
        userId,
        isDraft: isDraft,
      });
      console.log(res.data);
      isDraft ? router.push("/posts") : router.push(`/${res.data.slug}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function saveStory(context: context) {
    const { isDraft } = context;

    if (saving) {
      return;
    }

    setSaving(true);

    if (isNewPost) {
      await createPost(isDraft);
    } else {
      await updatePost(isDraft);
    }

    setSaving(false);
  }

  type settings = {
    tags: Tag[];
    slug: string;
    isThreadsEnabled: boolean;
  };

  async function saveSettings(settings: settings) {
    setSaving(true);

    if (!validatePost()) {
      toast("Saving failed", {
        description: "Title and description required",
        action: {
          label: "Close",
          onClick: () => console.log("Closing.."),
        },
      });
      setSaving(false);

      return;
    }

    const { tags, isThreadsEnabled } = settings;
    if (isNewPost) {
      try {
        const res = await axiosInstance.post("/post/", {
          title: metaData.title,
          description: metaData.description,
          tags: tags,
          content: data,
          userId,
          isDraft: true,
          isThreadsEnabled,
        });
        console.log(res.data);
        router.push(`/editor/?slug=${res.data.slug}`);
      } catch (error) {
        console.error(error);
        return;
      }
    } else {
      try {
        const res = await axiosInstance.put(`/post/?slug=${slug}`, {
          title: metaData.title,
          description: metaData.description,
          tags: tags,
          content: data,
          userId,
          isDraft: false,
          isThreadsEnabled,
        });
        console.log(res.data);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    toast("Done", {
      description: "Changes saved successfully",
      action: {
        label: "Close",
        onClick: () => console.log("Closing.."),
      },
    });
    setSaving(false);
  }

  useEffect(() => {
    if (slug) {
      fetchStory();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <EditorContext.Provider
      value={{
        metaData,
        setMetaData,
        data,
        setData,
        slug,
        loading,
        saving,
        saveStory,
        saveSettings,
        isNewPost,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
