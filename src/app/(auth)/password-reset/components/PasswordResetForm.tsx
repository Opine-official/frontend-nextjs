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
import { VERIFY_PASSWORD_RESET_CODE } from "@/shared/helpers/endpoints";

const formSchema = z.object({
  otp: z.string().length(6),
  email: z.string().email("Invalid email"),
});

const PasswordResetOTPForm = () => {
  const email = useSearchParams().get("email");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email ? email : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post(
        VERIFY_PASSWORD_RESET_CODE,
        values
      );
      console.log(response.data);
      router.push(
        `/new-password?email=${response.data.email}&otp=${response.data.otp}`
      );
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
                  <Input placeholder="OTP" {...field} />
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

export default PasswordResetOTPForm;
