import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Post {
  title: string;
  slug: string;
}

interface TrendingArticlesProps {
  posts: Post[];
}

const TrendingArticles: React.FC<TrendingArticlesProps> = ({ posts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Articles</CardTitle>
      </CardHeader>
      <CardContent>
        {posts.map((post, index) => (
          <p key={index}>
            <Link
              className="text-black hover:text-gray-500"
              href={`/${post.slug}`}
            >
              {post.title}
            </Link>
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingArticles;
