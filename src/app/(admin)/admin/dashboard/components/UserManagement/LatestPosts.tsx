import React from "react";

interface Post {
  postId: string;
  title: string;
  slug: string;
  createdAt: string;
}

interface LatestPostProps {
  posts: Post[];
}

const LatestPost: React.FC<LatestPostProps> = ({ posts }) => {
  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-10">Latest Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.postId} className="text-lg mb-2">
            <a href={`/${post.slug}`} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
            <p className="text-sm">
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestPost;
