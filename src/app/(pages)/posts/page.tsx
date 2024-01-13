import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PostList from "./components/PostList";
type Props = {};

const page = (props: Props) => {
  return (
    <div className="px-[400px] py-[100px]">
      <Tabs defaultValue="published" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger disabled value="draft">
            Draft
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="published">
          <PostList />
        </TabsContent>
        <TabsContent value="draft">Drafts go here</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
