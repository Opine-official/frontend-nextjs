import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "./ForgotPasswordForm";

type Props = {};

const ForgotPasswordCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto p-10">
      <CardHeader>
        <CardTitle className="mb-3">
          <span>Forgot your password?</span>
        </CardTitle>
        <CardDescription>
          No worries, even superheroes forget where they put their <br /> capes
          sometimes!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-start items-start">
        <span className="text-xs mt-[2px] text-gray-500">
          Give us your email, we&apos;ll send you an OTP.
        </span>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordCard;
