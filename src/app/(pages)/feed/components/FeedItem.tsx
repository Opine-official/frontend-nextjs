import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  postId: string;
  title: string;
  description: string;
  user: {
    name: string;
    email: string;
    username: string;
    bio?: string; // Not yet implemented
  };
  tags: string[];
  slug: string;
};

const FeedItem = ({ postId, title, description, user, tags, slug }: Props) => {
  return (
    <Link href={`/${slug}`}>
      <Card className="w-[800px] hover:shadow-lg transition duration-500">
        <CardHeader>
          <div className="flex gap-x-2 items-center mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm">{user.name}</span>
              <span className="text-sm text-gray-500">
                {user.bio || "Code whisperer"}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between">
          <Button>Read more</Button>
          <div className="flex space-x-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FeedItem;
