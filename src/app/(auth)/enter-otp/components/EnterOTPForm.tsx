"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  otp: z.string().length(6),
});

const EnterOTPForm = () => {
  const email = useSearchParams().get("email");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email ? email : "",
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/user/verifyEmail", values);
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-x-4 flex"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter OTP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button size="sm" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EnterOTPForm;