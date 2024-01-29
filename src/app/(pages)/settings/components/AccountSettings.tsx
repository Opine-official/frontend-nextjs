import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function AccountSettings() {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="mt-1 text-gray-600">Update your account settings.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input id="email" readOnly value="aravind@example.com" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input id="password" readOnly value="password" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="dob">
            DOB
          </label>
          <Input id="dob" readOnly value="10/04/1997" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="enable-2fa">
            Enable 2FA
          </label>
          <Switch id="enable-2fa" />
        </div>
      </div>
    </>
  );
}
