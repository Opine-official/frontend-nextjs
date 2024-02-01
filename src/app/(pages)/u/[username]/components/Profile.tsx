import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./Header";
import Post from "./PostItem";
import { useProfile } from "../provider/ProfileProvider";

const Profile = () => {
  const { user, posts } = useProfile();

  if (!user) {
    return <span>Loading...</span>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex items-center space-x-4">
        <Header user={user} />
      </div>
      <hr className="my-6" />
      <Tabs defaultValue="latest" className="flex space-x-4">
        <TabsList>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger disabled value="popular">
            Popular
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-3 gap-4 my-6">
        {posts?.map((post: any) => (
          <Post
            key={post._id}
            description={post.description}
            title={post.title}
            slug={post.slug}
            user={user}
          />
        ))}
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default Profile;
