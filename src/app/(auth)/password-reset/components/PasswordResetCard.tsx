import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PasswordResetOTPForm from './PasswordResetForm';

type Props = {};

const PasswordResetOTPFormCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto p-10">
      <CardHeader>
        <CardTitle className="mb-3">
          <span>Enter OTP</span>
        </CardTitle>
        <CardDescription>
          Enter the OTP sent to your email to verify and reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PasswordResetOTPForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
        <span className="text-xs mt-[2px] text-gray-500">
          OTP will expire in 1hr.
        </span>
      </CardFooter>
    </Card>
  );
};

export default PasswordResetOTPFormCard;
