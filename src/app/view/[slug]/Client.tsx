"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { client, getClient } from "@/lib/sanity/sanity";
import { postQuery } from "@/lib/sanity/queries";
import imageUrlBuilder from "@sanity/image-url";
import BlogPostComp from "@/components/BlogPost";
import PreviewBlogPost from "@/components/previewBlogPost";
import { Loader2 } from "lucide-react";
import PreviewProvider from "@/components/PreviewProvider";

interface BlogPostClientProps {
  slug: string;
  isDraftMode: boolean;
}

interface BlogPostProps {
  title?: string;
  author?: {
    name: string;
    avatar: string;
    title: string;
  };
  publishDate?: string;
  readTime?: string;
  category?: string;
  heroImage?: string;
  content?: {
    introduction?: string;
    sections?: Array<{
      title: string;
      content: string;
      image?: string;
      quote?: {
        text: string;
        author: string;
      };
    }>;
  };
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({
  slug,
  isDraftMode,
}) => {
  const builder = imageUrlBuilder({
    projectId: "lhkm6ysg",
    dataset: "production",
  });

  const sanityClient = getClient(isDraftMode);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => sanityClient.fetch(postQuery, { slug }),
    enabled: !!slug,
    // staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <article className="max-w-4xl mx-auto px-4 py-28 animate-pulse bg-black min-h-screen">
        {/* Header Section */}
        <header className="mb-8">
          {/* Title */}
          <div className="h-12 bg-gray-300 rounded-lg mb-6 w-3/4"></div>

          {/* Subtitle/excerpt */}
          <div className="h-6 bg-gray-200 rounded mb-4 w-5/6"></div>
          <div className="h-6 bg-gray-200 rounded mb-6 w-2/3"></div>

          {/* Author and date info */}
          <div className="flex items-center space-x-4 mb-6">
            {/* Author avatar */}
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              {/* Author name */}
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              {/* Date */}
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>

          {/* Category tags */}
          <div className="flex space-x-2 mb-6">
            <div className="h-6 bg-gray-200 rounded-full w-16 px-3"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20 px-3"></div>
            <div className="h-6 bg-gray-200 rounded-full w-24 px-3"></div>
          </div>
        </header>

        {/* Main Image */}
        <div className="mb-8">
          <div className="w-full h-64 md:h-96 bg-gray-300 rounded-lg"></div>
          {/* Image caption */}
          <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none space-y-6">
          {/* First paragraph */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded w-4/5"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Subheading */}
          <div className="h-8 bg-gray-300 rounded w-2/3 mt-8 mb-4"></div>

          {/* Second paragraph */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-10/12"></div>
            <div className="h-5 bg-gray-200 rounded w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Quote block */}
          <div className="border-l-4 border-gray-300 pl-6 my-8">
            <div className="h-6 bg-gray-200 rounded w-4/5 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Third paragraph */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-9/12"></div>
            <div className="h-5 bg-gray-200 rounded w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded w-4/5"></div>
          </div>

          {/* Another subheading */}
          <div className="h-8 bg-gray-300 rounded w-1/2 mt-8 mb-4"></div>

          {/* Fourth paragraph */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-10/12"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="h-5 bg-gray-200 rounded w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            <div className="h-5 bg-gray-200 rounded w-9/12"></div>
          </div>

          {/* List items */}
          <div className="space-y-3 mt-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="h-5 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="h-5 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>

          {/* Final paragraph */}
          <div className="space-y-3 mt-8">
            <div className="h-5 bg-gray-200 rounded w-full"></div>
            <div className="h-5 bg-gray-200 rounded w-11/12"></div>
            <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          {/* Share buttons */}
          <div className="flex space-x-4 mb-6">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          </div>

          {/* Author bio */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-300 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            </div>
          </div>
        </footer>
      </article>
    );
  }

  if (error) return <div>Error loading post</div>

  if (post && slug) {
    if (isDraftMode) {
      return (
        <PreviewProvider token="skUeaAYFWqFIOI8LfDuYSJlJezCUY5XI0NyozMW7o5Mmi2k31q80mmHZQw6cqOh1sVOjxlTdz5aiRvRKz1vcbN8LmwFjq7FYJVLTnU4YwkdrE8JfVh5jf5XvUY48EK2YF13m46qpg5vLQ503gyGusQEyodJtzHZnDgwMfxv97acXVQcXT0rn">
          <PreviewBlogPost post={post} slug={slug} />
        </PreviewProvider>
      );
    } else {
      return <BlogPostComp post={post} />
    }
  }

  return <div>Post not found</div>
}

export default BlogPostClient;
