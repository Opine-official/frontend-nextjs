import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const truncateDescription = (str: string) => {
    return str.length > 80 ? str.substring(0, 80) + "..." : str;
  };

  return (
    <Link href={`/${slug}`}>
      <Card className="h-[200px] hover:shadow-lg transition duration-500">
        <CardHeader>
          <CardTitle className="mb-2 overflow-hidden text-overflow-ellipsis">
            {title}
          </CardTitle>
          <CardDescription className="overflow-hidden text-overflow-ellipsis">
            {truncateDescription(description)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default Post;
