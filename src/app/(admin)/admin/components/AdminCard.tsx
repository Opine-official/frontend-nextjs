import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminForm from "./AdminForm";
import Image from "next/image";

type Props = {};

const AdminCard = (props: Props) => {
  return (
    <Card className="bg-white my-auto w-[350px]">
      <CardHeader>
        <CardTitle className="flex">
          <span>Admin</span>
          <Image src="/logo.png" alt="opine logo" width={24} height={24} />
        </CardTitle>
        <CardDescription>Enter details</CardDescription>
      </CardHeader>
      <CardContent>
        <AdminForm />
      </CardContent>
    </Card>
  );
};

export default AdminCard;
