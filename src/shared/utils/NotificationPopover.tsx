import useUser from "@/app/hooks/useUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiFillBell } from "react-icons/ai";

function NotificationItem({ notification }: any) {
  return (
    <div
      className={`p-4 border-b ${
        notification.read ? "bg-gray-200" : "bg-white"
      }`}
    >
      <p className="font-bold">{notification.type}</p>
      <p>{notification.message}</p>
    </div>
  );
}

export function NotificationPopover() {
  const { notifications } = useUser();

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <AiFillBell size={24} />
        </PopoverTrigger>
        <PopoverContent>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.notificationId}
              notification={notification}
            />
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}
