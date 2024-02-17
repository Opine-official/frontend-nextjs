"use client";
import React, { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_NOTIFICATIONS, GET_USER } from "@/shared/helpers/endpoints";
import { socket } from "../../configs/socket.config";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    try {
      const response = await axiosInstance.get(GET_USER);

      setUser(response?.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  const refetch = () => fetchUser();

  async function fetchNewNotifications() {
    try {
      const response = await axiosInstance.get(GET_NOTIFICATIONS);
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      fetchUser();
      fetchNewNotifications();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    socket?.connect();
    socket?.emit("join", user?.userId);

    socket?.on("new-notification", () => {
      console.log("new-notification triggered");
      fetchNewNotifications();
    });

    return () => {
      socket?.off("new-notification");
      socket?.disconnect();
    };
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, refetch, isLoading, notifications }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
