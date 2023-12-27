import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const ForgotPasswordCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto p-10">
      <CardHeader>
        <CardTitle className="flex">
          <span>Forgot your password?</span>
        </CardTitle>
        <CardDescription>
          Don&apos;t worry, just enter your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
        <span className="text-xs mt-[2px] text-gray-500">
          We&apos;ll send you an OTP.
        </span>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordCard;
