import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { FaInstagram, FaLink, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import useUser from "@/app/hooks/useUser";

type Props = {
  user: any;
};

interface IconProps extends IconBaseProps {
  icon: React.ComponentType<IconBaseProps>;
}

const IconWrapper: React.FC<IconProps> = ({ icon: Icon, ...props }) => (
  <Icon className="h-6 w-6" {...props} />
);

const ProfileView = ({ user }: Props) => {
  console.log(user);
  return (
    <div className="flex flex-col gap-y-12">
      <div className="flex">
        <Avatar className="h-16 w-16">
          <AvatarImage
            className="!rounded-none"
            alt="Profile picture"
            src={`${user?.profile}`}
          />
          x
          <AvatarFallback className="!rounded-none">
            {user?.name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{`${user?.name}`}</h1>
          <p className="text-sm text-gray-500">{`@${user?.username}`}</p>
          {user?.bio && <p className="mt-1 text-sm">{`${user?.bio}`}</p>}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <IconWrapper icon={FaTwitter} />
          {user.twitter ? (
            <a
              href={`https://twitter.com/${user?.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.twitter}
            </a>
          ) : (
            <p>n/a</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <IconWrapper icon={FaLinkedin} />
          {user?.linkedin ? (
            <a
              href={`https://linkedin.com/in/${user?.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.linkedin}
            </a>
          ) : (
            <p>n/a</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <IconWrapper icon={FaInstagram} />
          {user?.instagram ? (
            <a
              href={`https://instagram.com/${user?.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.instagram}
            </a>
          ) : (
            <p>n/a</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <IconWrapper icon={FaLink} />
          {user?.website ? (
            <a
              href={`${user?.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user?.website}
            </a>
          ) : (
            <p>n/a</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
