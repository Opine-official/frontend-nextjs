"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaFlag } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import useUser from "@/app/hooks/useUser";
import axiosInstance from "@/shared/helpers/axiosInstance";

const FormSchema = z.object({
  reportType: z.enum(
    ["spam", "inappropriate", "hate-speech", "harassment", "other"],
    {
      required_error: "You need to select a report type.",
    }
  ),
  otherDetails: z.string().optional(),
});

export function ReportDialog({ reportedUserId }: any) {
  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const reporterUserId = user?.userId;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axiosInstance.post("/user/report", {
        reportedUserId,
        reporterUserId,
        reason: data.reportType,
        isOtherReason: data.reportType === "other",
        otherDetails: data.otherDetails,
      });
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="icon"
          className="bg-gray-200 text-gray-700"
        >
          <FaFlag size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Report</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="reportType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Report Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="spam" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Spam or abuse
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="inappropriate" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Inappropriate content
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="hate-speech" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Hate speech or graphic violence
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="harassment" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Harassment or bullying
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("reportType") === "other" && (
                  <FormField
                    control={form.control}
                    name="otherDetails"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Other Details</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Please describe the issue..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
