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
import { Switch } from "@/components/ui/switch";
import useEditor from "../hooks/useEditor";

const FormSchema = z.object({
  tags: z.array(
    z
      .object({
        id: z.string(),
        text: z.string(),
      })
      .optional()
  ),
  slug: z.string().optional(),
  isThreadsEnabled: z.boolean().default(true).optional(),
});

export default function PostSettingsForm() {
  const { saving, saveSettings } = useEditor();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: [],
      slug: "",
      isThreadsEnabled: true,
    },
  });

  const [tags, setTags] = React.useState<Tag[]>([]);

  const { setValue } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const tagTexts = data?.tags?.map((tag) => tag?.text);

    saveSettings({
      tags: tagTexts,
      slug: data.slug,
      isThreadsEnabled: data.isThreadsEnabled,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-start"
      >
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Tags</FormLabel>
              <FormControl>
                {/* @ts-ignore */}
                <TagInput
                  {...field}
                  maxTags={5}
                  placeholder="Start typing to add a tag"
                  tags={tags}
                  className="sm:min-w-[450px]"
                  setTags={(newTags) => {
                    setTags(newTags);
                    setValue("tags", newTags as [Tag, ...Tag[]]);
                  }}
                />
              </FormControl>
              <FormDescription>
                Tags allow you to publish to a specific channel. You can add up
                to 5 tags.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="whats-the-headline-for-your-story"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can assign a custom slug. If you leave it blank, we&apos;ll
                auto generate one for you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isThreadsEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="text-left">Publish on threads</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={saving} type="submit">
          {!saving ? "Save" : "Saving..."}
        </Button>
      </form>
    </Form>
  );
}
