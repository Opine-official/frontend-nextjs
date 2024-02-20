"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CategoryManagement from "./CategoryManagement/CategoryManagement";
import ChannelManagement from "./ChannelManagement/ChannelManagement";
import UserManagement from "./UserManagement/UserManagement";

type Props = {};

export const VerticalTab = (props: Props) => {
  const [currentTab, setCurrentTab] = useState("user-management");

  const renderContent = () => {
    switch (currentTab) {
      case "user-management":
        return <UserManagement />;
      case "category-management":
        return <CategoryManagement />;
      case "channel-management":
        return <ChannelManagement />;

      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div className="mt-12 flex flex-col md:flex-row">
      <div className="flex flex-col w-full space-y-4 py-4 pr-4 md:w-64 md:border-r md:pr-8">
        <Button
          className={`block w-full text-right ${
            currentTab === "user-management" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("user-management")}
        >
          User Management
        </Button>
        <Button
          className={`block w-full text-right ${
            currentTab === "category-management" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("category-management")}
        >
          Category Management
        </Button>
        <Button
          className={`block w-full text-right ${
            currentTab === "channel-management" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("channel-management")}
        >
          Channel Management
        </Button>
      </div>
      <div className="mt-6 flex-1 space-y-6 p-4 md:mt-0 md:pl-8">
        {renderContent()}
      </div>
    </div>
  );
};
