import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "@/components/tag/tag-input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/shared/helpers/axiosInstance";

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  categories: z.array(
    z
      .object({
        id: z.string(),
        text: z.string(),
      })
      .optional()
  ),
});

export default function NewChannelForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: [],
    },
  });

  const [categories, setCategories] = React.useState<Tag[]>([]);

  const { setValue } = form;

  async function saveChannel(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axiosInstance.post("/channel/", {
        name: data.name,
        description: data.description,
        categories: data?.categories?.map((cat) => cat?.text),
      });
    } catch (e) {
      console.log(e);
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    saveChannel(data);
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
                &quot;Typescript&quot;. Channel names have to be unique.
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
                &quot;Everything typescript related&quot;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Categories</FormLabel>
              <FormControl>
                {/* @ts-ignore */}
                <TagInput
                  {...field}
                  tags={categories}
                  setTags={(newTags) => {
                    setCategories(newTags);
                    setValue("categories", newTags as [Tag, ...Tag[]]);
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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
