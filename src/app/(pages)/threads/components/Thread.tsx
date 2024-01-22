import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  name: string;
  bio: string;
  title: string;
  description: string;
  profile: string | null;
};

const dummyData = {
  post: {
    name: "Dan Abramov",
    bio: "SWE @ Meta",
    title: " Importance of Clean Architecture",
    description: `Clean Architecture is a software design concept that emphasizes
    separation of concerns and maintainability. Proposed by Robert C.
    Martin, it advocates a layered structure with distinct components for
    business logic, interfaces, and external frameworks. This modular
    approach promotes code scalability, testability, and adaptability,
    fostering a robust and maintainable software system.`,
    profile: null,
  },
  comment: [
    {
      name: "Lacy Tom",
      content: ` Interesting article gain lot&apos;s of info in this
    Are you interested in more feed-related content? If so, let us
    know in the comments - we have a couple more crips implementation
    details ready to be published.`,
      profile: null,
    },
  ],
};

const Thread = ({ name, bio, title, description, profile }: Props) => {
  return (
    <div className="max-w-xl bg-white p-6 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage alt={name} src={""} />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{bio}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-lg font-bold">{title}</div>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
      </div>
      <div className="mt-4">
        <Input placeholder="Add a comment" />
      </div>
      <div className="mt-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage
              alt="Lacy Tom"
              src="/placeholder.svg?height=32&width=32"
            />
            <AvatarFallback>LT</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-semibold">
              {dummyData.comment[0].name}
            </div>
            <p className="mt-1 text-sm text-gray-700">
              {dummyData.comment[0].content}
            </p>
            <Button className="text-xs mt-2" variant="ghost">
              Show more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
