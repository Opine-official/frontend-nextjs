import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { AlertDestructive } from "./AlertDestructive";
import useUser from "@/app/hooks/useUser";
import axiosInstance from "@/shared/helpers/axiosInstance";

type Props = {};

const ProfileSchema = z.object({
  name: z.string(),
  website: z.string().url(),
  username: z.string().min(3),
  twitter: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  location: z.string().optional(),
  instagram: z.string().optional(),
});

export default function ProfileSettings(props: Props) {
  const [profile, setProfile] = useState({
    name: "",
    website: "",
    username: "",
    twitter: "",
    bio: "",
    linkedin: "",
    location: "",
    instagram: "",
  });

  async function updateProfile() {
    try {
      const response = await axiosInstance.post("/user/update", profile);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        username: user.username || "",
        website: user.website || "",
        twitter: user.twitter || "",
        bio: user.bio || "",
        linkedin: user.linkedin || "",
        location: user.location || "",
        instagram: user.instagram || "",
      });
    }
  }, [user]);

  const [errors, setErrors] = useState<any>(null);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfile({
        ...profile,
        [field]: event.target.value,
      });
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateProfile();

    // const result = ProfileSchema.safeParse(profile);

    // console.log(result);

    // if (!result.success) {
    //   // If validation fails, set the errors to the state
    //   setErrors(result.error.formErrors.fieldErrors);
    // } else {
    //   // If validation succeeds, you can proceed with form submission
    //   // submitForm(result.data);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="mt-1 text-gray-600">
          This is how others will see you on the site.
        </p>
      </div>
      {errors && <AlertDestructive message={"errors"} />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Aravind Sanjeev"
            value={profile.name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="website">
            Website
          </label>
          <Input
            id="website"
            name="website"
            placeholder="www.aravindsanjeev.com"
            value={profile.website}
            onChange={handleChange("website")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="username">
            Username
          </label>
          <Input
            id="username"
            name="username"
            placeholder="aravsanj"
            value={profile.username}
            onChange={handleChange("username")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="twitter">
            Twitter
          </label>
          <Input
            id="twitter"
            name="twitter"
            placeholder="@aravsanj"
            value={profile.twitter}
            onChange={handleChange("twitter")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="bio">
            Bio
          </label>
          <Input
            id="bio"
            placeholder="My words, your journey"
            name="bio"
            value={profile.bio}
            onChange={handleChange("bio")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="linkedin">
            LinkedIn
          </label>
          <Input
            id="linkedin"
            placeholder="@aravsanj"
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange("linkedin")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="location">
            Location
          </label>
          <Input
            id="location"
            name="location"
            placeholder="Kerala, India"
            value={profile.location}
            onChange={handleChange("location")}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium" htmlFor="instagram">
            Instagram
          </label>
          <Input
            id="instagram"
            name="instagram"
            placeholder="@aravsanj"
            value={profile.instagram}
            onChange={handleChange("instagram")}
          />
        </div>
      </div>
      <Button onClick={updateProfile} className="mt-6" type="submit">
        Submit
      </Button>
    </form>
  );
}
