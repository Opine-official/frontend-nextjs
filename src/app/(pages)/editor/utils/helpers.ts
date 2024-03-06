import axiosInstance from "@/shared/helpers/axiosInstance";

export async function savePostHelper({
  data,
  metaData,
  userId,
  isDraft,
}: any): Promise<any> {
  try {
    const res = await axiosInstance.post("/post/", {
      title: metaData.title,
      description: metaData.description,
      tags: metaData.tags,
      content: data,
      userId,
      isDraft: isDraft,
    });
    console.log(res);
    return res;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    throw new Error("Saving failed");
  }
}

export async function updatePostHelper({
  data,
  metaData,
  userId,
  slug,
}: any): Promise<any> {
  try {
    const res = await axiosInstance.put(`/post/?slug=${slug}`, {
      title: metaData.title,
      description: metaData.description,
      tags: metaData.tags,
      content: data,
      userId,
    });
    console.log(res);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw error;
    }
    throw new Error("Updating failed");
  }
}
