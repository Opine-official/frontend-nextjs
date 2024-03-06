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
import { useRouter, useSearchParams } from "next/navigation";
import Countdown from "react-countdown";
import { useState } from "react";
import { toast } from "sonner";
import { RESEND_OTP } from "@/shared/helpers/endpoints";

type Props = {};
const renderer = ({ minutes, seconds, completed }: any) => {
  return (
    <span>
      Your OTP expires in {minutes}:{seconds}
    </span>
  );
};

const EnterOTPCard = (props: Props) => {
  const email = useSearchParams().get("email");
  const router = useRouter();

  if (!email) {
    router.push("/");
  }

  const [isCountdownComplete, setIsCountDownComplete] = useState(false);

  async function resendOTP() {
    try {
      const response = await axiosInstance.post(RESEND_OTP, {
        email: email,
      });

      setIsCountDownComplete(false);

      toast("OTP sent successfully", {
        description: "Check your email",
        action: {
          label: "Close",
          onClick: () => console.log("Closing.."),
        },
      });
      console.log(response.data);
    } catch (e) {
      console.error(e);
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
        <EnterOTPForm isCountdownComplete={isCountdownComplete} />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
        <div>
          <span className="text-xs mt-[2px] text-gray-500">
            {!isCountdownComplete ? (
              <Countdown
                autoStart={!isCountdownComplete}
                renderer={renderer}
                className="font-bold"
                date={Date.now() + 300000}
                onComplete={() => setIsCountDownComplete(true)}
              />
            ) : (
              "Your OTP expired."
            )}
            <Button
              disabled={!isCountdownComplete}
              onClick={resendOTP}
              variant="ghost"
              className="p-0 block"
            >
              Resend OTP
            </Button>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnterOTPCard;
