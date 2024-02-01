import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  title: string;
  description: string;
  slug: string;
  user: {
    name: string;
    username: string;
    bio?: string; // Not yet implemented
    profile?: string;
  };
};

const Post = ({ title, description, slug, user }: Props) => {
  return (
    <Link href={`/${slug}`}>
      <Card className="w-[250px] hover:shadow-lg transition duration-500">
        <CardHeader>
          <div className="flex gap-x-2 items-center mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs">{user.name}</span>
              <span className="text-xs text-gray-500">
                {user.bio || "Code whisperer"}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default Post;
