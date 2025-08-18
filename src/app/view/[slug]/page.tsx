// app/blog/[slug]/page.tsx (Server Component)
import React from "react";
import { draftMode } from 'next/headers';
import BlogPostClient from "./Client";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { isEnabled: isDraftMode } = await draftMode();
  const { slug } = await params; // Await the params Promise

  return (
    <BlogPostClient 
      slug={slug} 
      isDraftMode={isDraftMode} 
    />
  );
};

export default BlogPostPage;