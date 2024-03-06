"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SEARCH, SEARCH_TAG } from "@/shared/helpers/endpoints";

const SearchInput = ({ fetchPosts }: any) => {
  return (
    <Input
      onChange={(e) => fetchPosts(e.target.value)}
      className="w-full"
      placeholder="Search articles..."
      type="search"
    />
  );
};

const PostCard = ({ post }: any) => {
  return (
    <Link href={post?.slug}>
      <Card>
        <CardHeader>
          <CardTitle>{post?.title}</CardTitle>
          <CardDescription>
            {post?.user?.name} - {new Date(post?.postedOn).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post?.description}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Read More</Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

const Tag = ({ name, onTagClick, isSelected }: any) => {
  const handleClick = () => {
    onTagClick(name);
  };

  return (
    <Badge
      onClick={handleClick}
      variant="outline"
      className={`cursor-pointer p-2 mr-2 ${
        isSelected ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {name}
    </Badge>
  );
};

export default function Component() {
  const [posts, setPosts] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // const tags = [...new Set(posts.flatMap((post) => post.tags))];

  const handleTagClick = async (tagName: string) => {
    setSelectedTag(tagName);

    try {
      const response = await axiosInstance(SEARCH_TAG(tagName));
      console.log(response.data);
      setPosts(response.data.posts);
    } catch (e: unknown) {
      // handle error
    }
  };

  async function fetchPosts(query: string) {
    try {
      const response = await axiosInstance(SEARCH(query));
      setPosts(response.data);
      setTags([...new Set(response.data.flatMap((post: any) => post.tags))]);
      setSelectedTag(null);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  return (
    <section className="w-full pt-6 pb-12 md:pb-24 lg:pb-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <SearchInput fetchPosts={fetchPosts} />
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline">
                Most Recent
              </Button>
              <Button disabled className="flex-1" variant="outline">
                Most Popular
              </Button>
              <Button disabled className="flex-1" variant="outline">
                Trending
              </Button>
            </div>
            <div className="flex gap-2 mt-4">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  name={tag}
                  onTagClick={handleTagClick}
                  isSelected={tag === selectedTag}
                />
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts?.map((post: any) => (
              <PostCard key={post.postId} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
