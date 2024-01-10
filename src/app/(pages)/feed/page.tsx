"use client";
import axiosInstance from "@/shared/helpers/axiosInstance";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const FeedPage: React.FC = () => {
  const router = useRouter();

  async function verifyUser() {
    try {
      const response = await axiosInstance.get("/feed/verifyUser");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      router.push("/login");
    }
  }

  useEffect(() => {
    try {
      verifyUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl">Welcome, you are logged in!</h1>
      </div>
    </>
  );
};

export default FeedPage;
