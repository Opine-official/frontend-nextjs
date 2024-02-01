"use client";
import { IconBaseProps } from "react-icons";
import { ProfileProvider } from "./provider/ProfileProvider";
import Profile from "./components/Profile";

interface IconProps extends IconBaseProps {
  icon: React.ComponentType<IconBaseProps>;
}

const IconWrapper: React.FC<IconProps> = ({ icon: Icon, ...props }) => (
  <Icon className="h-6 w-6" {...props} />
);

export default function Page() {
  return (
    <ProfileProvider>
      <Profile />
    </ProfileProvider>
  );
}
