// components/PreviewBlogPost.tsx
'use client'
import { useLiveQuery } from '@sanity/preview-kit'
import { previewClient } from '@/lib/sanity/sanity'
import { postQuery } from '@/lib/sanity/queries'
import { BlogPost } from '@/lib/sanity/queries'
import BlogPostComp from './BlogPost'

interface PreviewBlogPostProps {
  post: BlogPost; // or serverData, fallbackPost, etc.
  slug: string | string[];
}
export default function PreviewBlogPost({ post: initialPost, slug }: PreviewBlogPostProps) {
  const [post] = useLiveQuery<BlogPost>(
    initialPost, 
    postQuery, 
    { slug }
  )

  return (
    <div className='py-28'>
      <div className="bg-yellow-400 p-2 text-center text-black">
        <p className="text-sm font-medium">
          🔍 Preview Mode - Showing Drafts - 
          <a 
            href="/api/preview/disable" 
            className="ml-2 underline hover:no-underline"
          >
            Exit Preview
          </a>
        </p>
      </div>
      <BlogPostComp post={post} />
    </div>
  )
}