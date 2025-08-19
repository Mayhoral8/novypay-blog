import React from "react";
import Image from "next/image";
import { PortableTextRenderer } from "@/lib/sanity/portableTextComponents";
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { BlogPost } from "@/lib/sanity/queries";

const BlogPostComp: React.FC<{ post: BlogPost }> = ({ post }) => {
  const builder = imageUrlBuilder({
    projectId: "y4zzsrxn",
    dataset: "production",
  });
  const urlFor = (source: string) => builder.image(source);

  return (
    <div className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Blog</span>
          <span>/</span>
          <span className="text-gray-200">{post?.category?.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-6 leading-tight">
            {post?.title}
          </h1>

          <p className="text-xl text-gray-100 mb-8 leading-relaxed">
            {post?.subtitle ??
              "How do you create compelling presentations that wow your colleaguesand impress your managers?"}
          </p>

          <div className="flex items-center space-x-4">
            {/* <Image
                src={urlFor(post?.heroImage).width(800).height(400).url()}
                width={800}
                height={100}
                alt={post.title}
                className="w-full h-full object-cover"
              /> */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-200">
                  {post?.author.name}
                </span>
                <span className="text-gray-100">•</span>
                <span className="text-gray-100">
                  {new Date(post?.publishedAt).toLocaleString()}
                </span>
                <span className="text-gray-100">•</span>
                <span className="text-gray-100">{post?.readTime ?? ""}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {post?.author.title ?? ""}
              </p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-12">
          <Image
            src={urlFor(post?.heroImage).width(800).height(400).url()}
            width={800}
            height={800}
            alt={post?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Introduction */}

        <div className="prose max-w-none mb-8 text-white">
          <PortableTextRenderer content={post?.body} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            Design
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            Tips
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            UX
          </span>
        </div>

        {/* Share */}
        <div className="border-t border-gray-200 pt-8 mb-16">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">
              Share this article
            </span>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Link2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostComp;
