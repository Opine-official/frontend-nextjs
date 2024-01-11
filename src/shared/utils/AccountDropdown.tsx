import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiAccountCircleFill } from "react-icons/ri";
import axiosInstance from "../helpers/axiosInstance";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";

type Props = {};

const AccountDropdown = (props: Props) => {
  const router = useRouter();
  const { refetch } = useUser();

  function logOut() {
    try {
      const response = axiosInstance.post("/user/logout");
      refetch();
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <RiAccountCircleFill size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={logOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
