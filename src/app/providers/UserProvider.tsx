"use client";
import React, { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_USER } from "@/shared/helpers/endpoints";
import { socket } from "../../configs/socket.config";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
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

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    socket?.connect();
    socket?.emit("join", user?.userId);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, refetch, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
