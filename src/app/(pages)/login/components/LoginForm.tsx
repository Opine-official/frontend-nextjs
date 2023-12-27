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

const formSchema = z.object({
  emailOrUsername: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axiosInstance.post("/user/login", values);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input placeholder="Email or Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
