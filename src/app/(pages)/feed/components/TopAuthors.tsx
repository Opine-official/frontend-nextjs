import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Author {
  name: string;
  slug: string;
}

interface TopAuthorsProps {
  authors: Author[];
}

const TopAuthors: React.FC<TopAuthorsProps> = ({ authors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Authors</CardTitle>
      </CardHeader>
      <CardContent>
        {authors.map((author, index) => (
          <p key={index}>
            <Link href={`/${author.slug}`}>{author.name}</Link>
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopAuthors;
