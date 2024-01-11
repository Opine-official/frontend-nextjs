import ForgotPasswordCard from "./components/ForgotPasswordCard";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
    
      <div className="p-8 mx-4 bg-gray-800 rounded-lg shadow-lg">
        <ForgotPasswordCard />
      </div>

      <Link href="/" className="mt-4 text-sm text-gray-500 hover:text-white">
        Back to main page
      </Link>
    </div>
  );
};

export default Page;
