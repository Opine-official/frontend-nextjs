"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CategoryManagement from "./CategoryManagement/CategoryManagement";
import ChannelManagement from "./ChannelManagement/ChannelManagement";
import UserManagement from "./UserManagement/UserManagement";
import ArticleManagement from "./ArticleManagement/ArticleManagement";
import Dashboard from "./Dashboard/Dashboard";

type Props = {};

export const VerticalTab = (props: Props) => {
  const [currentTab, setCurrentTab] = useState("dashboard");

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;
      case "user-management":
        return <UserManagement />;
      case "article-management":
        return <ArticleManagement />;
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
          className={`block w-full text-left ${
            currentTab === "dashboard" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("dashboard")}
        >
          Overview
        </Button>
        <Button
          className={`block w-full text-left ${
            currentTab === "user-management" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("user-management")}
        >
          User Management
        </Button>
        <Button
          className={`block w-full text-left ${
            currentTab === "article-management" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("article-management")}
        >
          Article Management
        </Button>
        <Button
          className={`block w-full text-left ${
            currentTab === "category-management" ? "bg-gray-200" : ""
          }`}
          variant="ghost"
          onClick={() => setCurrentTab("category-management")}
        >
          Category Management
        </Button>
        <Button
          className={`block w-full text-left ${
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
