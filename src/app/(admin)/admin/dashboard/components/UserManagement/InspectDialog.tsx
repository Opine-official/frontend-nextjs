import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ProfileView from "./ProfileView";
import {
  GET_COMMENTS_AND_POSTS_BY_USER,
  GET_POSTS_BY_USERNAME,
  GET_USER_BY_USERNAME,
} from "@/shared/helpers/endpoints";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LatestPost from "./LatestPosts";
import LatestComments from "./LatestComments";

type Props = {
  report: any;
};

const InspectDialog = ({ report }: Props) => {
  console.log(report);

  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  async function getUser() {
    try {
      const response = await axiosInstance.get(
        GET_USER_BY_USERNAME(report?.reporter)
      );
      console.log(response.data);
      setUser(response.data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async function getPosts() {
    try {
      const response = await axiosInstance.get(
        GET_POSTS_BY_USERNAME(report?.reporter)
      );
      console.log(response.data);
      setPosts(response.data);
      // setUser(response.data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async function getCommentsAndPostsByUser() {
    try {
      const response = await axiosInstance.get(
        GET_COMMENTS_AND_POSTS_BY_USER(user?.userId)
      );
      console.log(response.data);
      setComments(response.data.comments);
      // setPosts(response.data);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  useEffect(() => {
    getCommentsAndPostsByUser();
  }, [user]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Inspect</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[700px]">
        {/* <div className="mx-auto w-full"> */}
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription className="flex gap-x-24 px-10">
            <ProfileView user={user} />
            <LatestPost posts={posts} />
            <LatestComments comments={comments} />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button className="w-[100px]">Ban</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
        {/* </div> */}
      </DrawerContent>
    </Drawer>
  );
};

export default InspectDialog;
