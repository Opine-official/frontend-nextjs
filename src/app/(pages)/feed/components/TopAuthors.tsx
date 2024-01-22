import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import axiosInstance from "@/shared/helpers/axiosInstance";

interface Author {
  name: string;
  username: string;
}

interface TopAuthorsProps {
  authors: Author[];
}

const TopAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  async function getTopAuthors() {
    try {
      const response = await axiosInstance.get("/feed/topUsers");
      // console.log(response.data);
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getTopAuthors();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Authors</CardTitle>
      </CardHeader>
      <CardContent>
        {authors.map((author, index) => (
          <p key={index}>
            <Link href={`/${author.username}`}>{author.name}</Link>
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopAuthors;
