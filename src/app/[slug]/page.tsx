// app/blog/[slug]/page.tsx (Server Component)
import React from "react";
import { draftMode } from 'next/headers';
import BlogPostClient from "./Client";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { isEnabled: isDraftMode } = await draftMode();
  const { slug } = params;

  return (
    <BlogPostClient 
      slug={slug} 
      isDraftMode={isDraftMode} 
    />
  );
};

export default BlogPostPage;