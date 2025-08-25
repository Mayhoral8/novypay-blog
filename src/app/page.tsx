"use client";
import React, { useState } from "react";
import usePaginatedPosts from "@/hooks/blog/usePaginatedPosts";
import background from "@/assets/bg-black.png";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { BlogPost } from "@/lib/sanity/queries";

// Sample blog data

const builder = imageUrlBuilder({
  projectId: "y4zzsrxn",
  dataset: "production",
});

const urlFor = (source: string) => builder.image(source);

// Usage:

const DesignBlog = () => {
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, error } = usePaginatedPosts(currentPage);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen ">
      <div className={` absolute z-[-10] bottom-0 top-0 right-0 left-0`}>
        <Image
          src={background}
          alt="background"
          className="w-full lg:h-full h-[1000px] md:h-[1200px]"
        />
      </div>

      {/* Hero Section */}
      <section className=" text-white py-28">
        <div className="max-w-7xl mx-auto text-center w-full px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="mb-4">
              <span className="text-white text-sm font-medium">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to the Novy Pay blog.
            </h1>
            <p className="text-xl text-white ">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>

          </div>
        </div>
      </section>

      {/* Blog Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-16 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.posts?.map((post: BlogPost, index: number) => {
                return (
                  <Link key={index} href={`view/${post.slug.current}`}>
                    <article className="bg-[#1A1A1A] rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden h-[450px] cursor-pointer group">
                      {/* Image Container - Takes up top half */}
                      <div className="bg-gray-200 relative overflow-hidden rounded-t-xl h-1/2">
                        <Image
                          src={urlFor(post.heroImage).url()}
                          fill // Use fill instead of fixed dimensions
                          alt={post.title}
                          objectFit="cover"
                          className="object-cover group-hover:scale-105 transition-transform duration-300" // Cover for better card appearance
                        />
                      </div>

                      {/* Content Container - Takes up bottom half */}
                      <div className="p-4 h-1/2 flex flex-col justify-between py-auto">
                        {/* Top section with metadata and title */}
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <span>{post.category.title}</span>
                            <span>•</span>
                            <span>
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-white group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                        </div>

                       
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-12">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <span className="text-gray-600">Page 1 of 5</span>

              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900">
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DesignBlog;
