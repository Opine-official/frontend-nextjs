// EnterNewPasswordCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EnterNewPasswordForm from './EnterNewPasswordForm';

type Props = {};

const EnterNewPasswordCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto p-10">
      <CardHeader>
        <CardTitle className="mb-3">
          <span>Enter New Password</span>
        </CardTitle>
        <CardDescription>
          Create a new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnterNewPasswordForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
        <span className="text-xs mt-[2px] text-gray-500">
          Password must be at least 8 characters long and include a mix of letters, <br />numbers, and symbols.
        </span>
      </CardFooter>
    </Card>
  );
};

export default EnterNewPasswordCard;
