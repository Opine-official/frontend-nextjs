import useUser from "@/app/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import axiosInstance, {
  axiosInstanceMultipart,
} from "@/shared/helpers/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Account = {
  email: string;
  [key: string]: string;
};

export default function AccountSettings() {
  const [account, setAccount] = useState<Account>({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useUser();

  async function updateAccount() {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(account).forEach((key) => {
        formData.append(key, account[key]);
      });

      formData.append("profile", "");

      const response = await axiosInstanceMultipart.post(
        "/user/update",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
    toast("Success", {
      description: "Account settings have been saved successfully",
      action: {
        label: "Close",
        onClick: () => console.log("Closing.."),
      },
    });
  }

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setAccount({
        ...account,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateAccount();
  };

  useEffect(() => {
    if (user) {
      setAccount({
        email: user.email,
      });
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="mt-1 text-gray-600">Update your account settings.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            disabled={isSubmitting}
            value={account.email}
            onChange={handleChange("email")}
          />
        </div>
        {/* <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            value={account.password}
            onChange={handleChange("password")}
          />
        </div> */}
        {/* <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="dob">
            DOB
          </label>
          <Input id="dob" value={account.dob} onChange={handleChange("dob")} />
        </div> */}
        {/* <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="enable-2fa">
            Enable 2FA
          </label>
          <Switch
            id="enable-2fa"
            checked={account.enable2fa}
            onChange={handleSwitchChange}
          />
        </div> */}
      </div>
      <Button className="mt-6" type="submit">
        Submit
      </Button>
    </form>
  );
}
