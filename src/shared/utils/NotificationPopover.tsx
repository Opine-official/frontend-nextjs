import useUser from "@/app/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AiFillBell } from "react-icons/ai";
import axiosInstance from "../helpers/axiosInstance";
import { MARK_AS_READ } from "../helpers/endpoints";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import Link from "next/link";

function NotificationItem({ notification }: any) {
  return (
    <Link href={`/${notification.entityData.slug}`}>
      <div
        className={`flex items-start justify-between p-4 border-b ${
          notification.read ? "bg-gray-100" : "bg-white"
        }`}
      >
        <div>
          <p className="font-bold text-lg mb-1">{notification.type}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <p className="text-sm text-gray-600">
            {notification.entityData.title}
          </p>
        </div>
        <div className="flex items-center">
          {notification.read ? (
            <AiOutlineCheckCircle className="text-green-500" />
          ) : (
            <AiOutlineCloseCircle className="text-red-500" />
          )}
        </div>
      </div>
    </Link>
  );
}
export function NotificationPopover() {
  const [notificationCount, setNotificationCount] = useState(0);
  const { notifications } = useUser();

  const getUnreadNotificationsCount = () => {
    return notifications.filter((notification) => !notification.read).length;
  };
  async function markAsRead() {
    try {
      const response = await axiosInstance.post(MARK_AS_READ, {
        notificationIds: notifications
          .filter((notification) => !notification.read)
          .map((notification) => notification.notificationId),
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleUnreadNotifications() {
    notifications.forEach((notification: any) => {
      notification.read = true;
    });
  }

  useEffect(() => {
    const unreadNotificationsCount = getUnreadNotificationsCount();
    setNotificationCount(unreadNotificationsCount);
  }, [notifications]);

  return (
    <>
      <Popover
        onOpenChange={(isOpen) => {
          if (isOpen) {
            markAsRead();
          } else {
            handleUnreadNotifications();
            setNotificationCount(0);
          }
        }}
      >
        <PopoverTrigger>
          {notificationCount > 0 && (
            <Badge className="bg-red-900 rounded-full">
              {notificationCount}
            </Badge>
          )}
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
