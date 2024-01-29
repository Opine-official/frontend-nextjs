import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaInstagram, FaLink, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IconProps extends IconBaseProps {
  icon: React.ComponentType<IconBaseProps>;
}

const IconWrapper: React.FC<IconProps> = ({ icon: Icon, ...props }) => (
  <Icon className="h-6 w-6" {...props} />
);

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage
            alt="Profile picture"
            src="/placeholder.svg?height=100&width=100"
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Aravind Sanjeev</h1>
          <p className="text-sm text-gray-500">@aravsanj</p>
          <p className="mt-1 text-sm">My words, your journey</p>
        </div>
        <div className="flex space-x-2">
          <IconWrapper icon={FaTwitter} />
          <IconWrapper icon={FaLinkedin} />
          <IconWrapper icon={FaInstagram} />
          <IconWrapper icon={FaLink} />
        </div>
        <Button disabled className="bg-gray-200 text-gray-700">
          Follow (30k)
        </Button>
      </div>
      <hr className="my-6" />
      <Tabs defaultValue="latest" className="flex space-x-4">
        <TabsList>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-3 gap-4 my-6">
        <Card className="w-full bg-gray-100 h-48" />
        <Card className="w-full bg-gray-100 h-48" />
        <Card className="w-full bg-gray-100 h-48" />
      </div>
      <hr className="my-6" />
    </div>
  );
}
