import React from "react";
import { VerticalTab } from "./components/VerticalTab";

const AdminDashboard: React.FC = () => {
  return (
    <div className="px-40 py-20">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="flex mt-10 h-screen ">
        <VerticalTab />
      </div>
    </div>
  );
};

export default AdminDashboard;
