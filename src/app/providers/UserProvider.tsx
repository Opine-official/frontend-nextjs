"use client";
import React, { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axiosInstance from "@/shared/helpers/axiosInstance";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    try {
      const response = await axiosInstance.get("/user/details");

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

  return (
    <UserContext.Provider value={{ user, setUser, refetch, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
