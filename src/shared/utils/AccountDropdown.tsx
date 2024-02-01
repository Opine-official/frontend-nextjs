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
  const { user, refetch } = useUser();
  const username = user?.username;

  function logOut() {
    try {
      const response = axiosInstance.post("/user/logout");
      refetch();
      router.replace("/login");
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
        <DropdownMenuItem
          onClick={() => router.push(`/u/${username}`)}
          className="cursor-pointer"
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/posts")}
          className="cursor-pointer"
        >
          Posts
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="cursor-pointer"
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
