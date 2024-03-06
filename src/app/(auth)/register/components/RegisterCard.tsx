import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const RegisterCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto w-[350px]">
      <CardHeader>
        <CardTitle className="flex">
          <span>Opine</span>
          <Image src="/logo.png" alt="opine logo" width={24} height={24} />
        </CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter>
        <Link href="/login">
          <span className="text-sm text-gray-500">
            Already have an account?
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RegisterCard;
