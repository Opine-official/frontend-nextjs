"use client";
import React, { useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axiosInstance from "@/shared/helpers/axiosInstance";

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  async function fetchUser() {
    try {
      const response = await axiosInstance.get("/user/details");

      setUser(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
