"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProfileSettings from "./components/ProfileSettings";
import AccountSettings from "./components/AccountSettings";

export default function Component() {
  const [currentTab, setCurrentTab] = useState("Profile");

  const renderContent = () => {
    switch (currentTab) {
      case "Profile":
        return <ProfileSettings />;
      case "Account":
        return <AccountSettings />;
      // Add more cases for other tabs
      default:
        return <div>Profile Content</div>;
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-lg text-gray-600">
          Manage your account settings and set preferences.
        </p>
        <div className="mt-12 flex flex-col md:flex-row">
          <div className="flex flex-col w-full space-y-4 py-4 pr-4 md:w-64 md:border-r md:pr-8">
            <Button
              className={`block w-full ${
                currentTab === "Profile" ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setCurrentTab("Profile")}
            >
              Profile
            </Button>
            <Button
              className={`block w-full ${
                currentTab === "Account" ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setCurrentTab("Account")}
            >
              Account
            </Button>
            <Button
              disabled
              className={`block w-full ${
                currentTab === "Privacy" ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setCurrentTab("Privacy")}
            >
              Privacy
            </Button>
            <Button
              disabled
              className={`block w-full ${
                currentTab === "Appearance" ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setCurrentTab("Appearance")}
            >
              Appearance
            </Button>
            <Button
              disabled
              className={`block w-full ${
                currentTab === "Notifications" ? "bg-gray-200" : ""
              }`}
              variant="ghost"
              onClick={() => setCurrentTab("Notifications")}
            >
              Notifications
            </Button>
          </div>
          <div className="mt-6 flex-1 space-y-6 p-4 md:mt-0 md:pl-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
