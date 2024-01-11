"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import AccountDropdown from "@/shared/utils/AccountDropdown";
import { AiFillBell } from "react-icons/ai";

type Props = {};

const AuthButtons = (props: Props) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (isLoading) return <Skeleton className="h-4 w-[100px]" />;

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={() => {
            router.push("/editor");
          }}
        >
          Write
        </Button>
        <AiFillBell size={24} />
        <AccountDropdown />
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => {
          router.push("/login");
        }}
        variant="outline"
      >
        Log in
      </Button>

      <Button
        onClick={() => {
          router.push("/register");
        }}
      >
        Get started
      </Button>
    </>
  );
};

export default AuthButtons;
