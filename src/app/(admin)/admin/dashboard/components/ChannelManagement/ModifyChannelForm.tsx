import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "@/components/ui/input";
import AsyncSelect from "react-select/async";
import axiosInstance from "@/shared/helpers/axiosInstance";

const FormSchema = z.object({
  channelId: z.string(),
  name: z.string(),
  description: z.string(),
  channels: z.array(
    z
      .object({
        id: z.string(),
        text: z.string(),
      })
      .optional()
  ),
});

export default function ModifyChannelForm({
  refreshData,
  channel,
  setOpen,
}: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      channelId: channel.id,
      name: channel.name,
      description: channel.description,
      channels: [],
    },
  });

  const { setValue } = form;

  const promiseOptions = (inputValue: string) =>
    new Promise<any[]>((resolve, reject) => {
      axiosInstance
        .get(`/channel/?searchTerm=${inputValue}`)
        .then((response) => {
          if (response.status === 200) {
            const channels = response.data.channels.map((channel: any) => ({
              value: channel.channelId,
              label: channel.name,
            }));
            resolve(channels);
          } else {
            reject(`Unexpected response status: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error("Error occurred while fetching data: ", error);
          reject(error);
        });
    });

  async function updateChannel(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axiosInstance.put("/channel/channel/", {
        channelId: channel.id,
        name: data?.name,
        description: data?.description,
        channels: data.channels.map((chan) => chan?.id),
      });
      refreshData();
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    updateChannel(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-start"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Channel Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of the channel. For example,
                &quot;Technology&quot;. Channel names have to be unique.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Channel Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter a brief description of the channel. For example,
                &quot;Everything technology related&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="channels"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Add Categories</FormLabel>
              <FormControl>
                <AsyncSelect
                  isMulti
                  cacheOptions
                  defaultOptions
                  loadOptions={promiseOptions}
                  className="w-full"
                  onChange={(selectedOptions) => {
                    const newChannels = selectedOptions.map((option) => ({
                      id: option.value,
                      text: option.label,
                    }));

                    setValue("channels", newChannels);
                  }}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Enter the categories this channel would come under. You can add
                multiple categories.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
