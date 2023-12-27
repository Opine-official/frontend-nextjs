"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {};

const AuthButtons = (props: Props) => {
  const router = useRouter();
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
