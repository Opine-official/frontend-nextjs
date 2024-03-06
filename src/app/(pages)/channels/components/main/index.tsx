import React from "react";
import Category from "./Category";

const content = [
  {
    name: "Technology",
    description: "This is category description",
    channels: [
      {
        name: "Programming",
        description: "This is channel description",
        posts: [
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
        ],
      },
      {
        name: "Hardware",
        description: "This is channel description",
        posts: [
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
        ],
      },
    ],
  },
  {
    name: "Technology",
    description: "This is category description",
    channels: [
      {
        name: "Programming",
        description: "This is channel description",
        posts: [
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
        ],
      },
      {
        name: "Hardware",
        description: "This is channel description",
        posts: [
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
          {
            title: "How to use React",
            description: "This is a post description",
            slug: "how-to-use-react",
            user: {
              name: "Shad Mirza",
              bio: "Code whisperer",
              username: "shadcn",
              profile: "",
            },
          },
        ],
      },
    ],
  },
];

const CategoryContainer = () => {
  return (
    <div className="flex flex-col gap-y-20">
      {content.map((category) => {
        return (
          <Category
            key={category.name}
            name={category.name}
            description={category.description}
            channels={category.channels}
          />
        );
      })}
    </div>
  );
};

export default CategoryContainer;
