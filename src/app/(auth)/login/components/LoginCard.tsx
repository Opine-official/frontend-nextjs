import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const LoginCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto w-[350px]">
      <CardHeader>
        <CardTitle className="flex">
          <span>Opine</span>
          <Image src="/logo.png" alt="opine logo" width={24} height={24} />
        </CardTitle>
        <CardDescription>Welcome back</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
      <Link
          href="/forgot-password"
          className="text-xs mt-[2px] text-gray-500 text-right"
        >
          Forgot password?
        </Link>
        <Link href="/register" className="text-sm text-gray-500">
          <span>Don&apos;t have an account?</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
