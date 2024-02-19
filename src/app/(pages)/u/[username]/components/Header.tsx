import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FaFlag,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { ReportDialog } from "./ReportDialog";
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

const Header = ({ user }: Props) => {
  const profileUserId = user.userId;
  const { user: LoggedInUser } = useUser();

  const isLogged = !!LoggedInUser;
  const isOwnProfile = LoggedInUser?.userId === profileUserId;

  return (
    <>
      <Avatar className="h-16 w-16">
        <AvatarImage
          className="!rounded-none"
          alt="Profile picture"
          src={`${user.profile}`}
        />
        <AvatarFallback className="!rounded-none">
          {user.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{`${user.name}`}</h1>
        <p className="text-sm text-gray-500">{`@${user.username}`}</p>
        <p className="mt-1 text-sm">{`${user.bio}`}</p>
      </div>
      <div className="flex space-x-2">
        <div className="flex space-x-2">
          <a
            href={`https://twitter.com/${user.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper icon={FaTwitter} />
          </a>
          <a
            href={`https://linkedin.com/in/${user.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper icon={FaLinkedin} />
          </a>
          <a
            href={`https://instagram.com/${user.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper icon={FaInstagram} />
          </a>
          <a href={`${user.website}`} target="_blank" rel="noopener noreferrer">
            <IconWrapper icon={FaLink} />
          </a>
        </div>
      </div>
      {isLogged && !isOwnProfile && (
        <ReportDialog reportedUserId={profileUserId} />
      )}
    </>
  );
};

export default Header;
