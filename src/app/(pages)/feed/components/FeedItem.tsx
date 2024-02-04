import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Props = {
  postId: string;
  title: string;
  description: string;
  user: {
    profile: string | null;
    name: string;
    email: string;
    username: string;
    bio?: string; // Not yet implemented
  };
  tags: string[];
  slug: string;
  postedOn: string;
};

const FeedItem = ({
  postId,
  title,
  description,
  user,
  tags,
  slug,
  postedOn,
}: Props) => {
  const date = dayjs(postedOn).fromNow();

  return (
    <Link href={`/${slug}`}>
      <Card className="w-[800px] hover:shadow-lg transition duration-500">
        <CardHeader>
          <div className="flex gap-x-2 items-center mb-4">
            <Avatar>
              <AvatarImage src={user.profile ? user.profile : ""} />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex gap-x-2 justify-between items-center">
                <span className="text-sm">{user?.name}</span>
                <p className="text-xs text-gray-500">{date}</p>
              </div>
              <span className="text-sm text-gray-500">
                {user?.bio || "Code whisperer"}
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
