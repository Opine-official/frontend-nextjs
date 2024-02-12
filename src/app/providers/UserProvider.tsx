"use client";
import React, { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { GET_USER } from "@/shared/helpers/endpoints";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
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

  return (
    <UserContext.Provider value={{ user, setUser, refetch, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
