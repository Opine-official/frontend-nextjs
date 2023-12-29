"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EnterOTPForm from "./EnterOTPForm";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useSearchParams } from "next/navigation";

type Props = {};


const EnterOTPCard = (props: Props) => {
  const email = useSearchParams().get("email");

 async function resendOTP() {
    try {
     const response = await axiosInstance.post("/user/resendOTP", { email: email });
      console.log(response.data);
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <Card className="bg-white my-auto p-10">
      <CardHeader>
        <CardTitle className="mb-3">
          <span>Enter OTP</span>
        </CardTitle>
        <CardDescription>
          We have sent you an OTP on your email address. Please enter it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnterOTPForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
        <span className="text-xs mt-[2px] text-gray-500">
          Your OTP expires in 1 hr.
        </span>
          <Button onClick={resendOTP} variant="ghost" className="p-0">
            Resend OTP
          </Button>
      </CardFooter>
    </Card>
  );
};

export default EnterOTPCard;
