"use client";
import React, { useState } from "react";
import usePaginatedPosts from "@/hooks/blog/usePaginatedPosts";
import {
  ChevronDown,
  Play,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Apple,
  Smartphone,
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
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">U</span>
              </div>
              <span className="font-semibold text-gray-900">Untitled UI</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900">Products</a>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900">Solutions</a>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <a href="#" className="text-gray-700 hover:text-gray-900">Pricing</a>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900">Resources</a>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900">Company</a>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900">Careers</a>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </nav>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className=" text-white py-28">
        <div className="max-w-7xl mx-auto text-center w-full px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className="mb-4">
              <span className="text-blue-200 text-sm font-medium">Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to the illusion services blog.
            </h1>
            {/* <p className="text-xl text-blue-100 mb-8">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>

            <div className="flex gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleSubscribe}
                className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </div> */}
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.posts?.map((post: BlogPost, index: number) => {
                return (
                  <Link key={index} href={`view/${post.slug.current}`}>
                    <article className="bg-[#2c2c30] rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden p-1">
                      <div className="aspect-video bg-gray-200 relative overflow-hidden rounded-t-xl">
                        <Image
                          src={urlFor(post.heroImage)
                            .width(400)
                            .height(400)
                            .url()}
                          width={100}
                          height={100}
                          alt={post.title}
                          objectFit="cover"
                          className="w-full h-full "
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-200 mb-3">
                          <span className="">{post.category.title}</span>
                          <span>•</span>
                          <span>{post.publishedAt}</span>
                        </div>

                        <h3 className="text-xl font-semibold  mb-3 line-clamp-2 text-primary">
                          {post.title}
                        </h3>

                        <p className="text-gray-200 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {post?.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-200 text-sm rounded-full"
                            >
                              {tag.title}
                            </span>
                          ))}
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
