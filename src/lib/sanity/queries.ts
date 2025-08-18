import { groq } from 'next-sanity'

// Get all posts for blog listing
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    heroImage,
    publishedAt,
    readTime,
    featured,
    author->{
      name,
      slug,
      avatar,
      title
    },
    category->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get paginated posts
export const paginatedPostsQuery = groq`
  {
    "posts": *[_type == "post"] | order(publishedAt desc) [$start...$end] {
      _id,
      title,
      subtitle,
      slug,
      excerpt,
      heroImage,
      publishedAt,
      readTime,
      featured,
      author->{
        name,
        slug,
        avatar,
        title
      },
      category->{
        title,
        slug,
        color
      },
      tags[]->{
        title,
        slug
      }
    },
    "total": count(*[_type == "post"])
  }
`

// Get single post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    _rev,
    subtitle,
    slug,
    excerpt,
    heroImage,
    body,
    publishedAt,
    readTime,
    featured,
    author->{
      name,
      slug,
      avatar,
      title,
      bio,
      social
    },
    category->{
      title,
      slug,
      color,
      description
    },
    tags[]->{
      title,
      slug
    },
    seo
  }
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    heroImage,
    publishedAt,
    readTime,
    author->{
      name,
      slug,
      avatar,
      title
    },
    category->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get posts by tag
export const postsByTagQuery = groq`
  *[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    heroImage,
    publishedAt,
    readTime,
    author->{
      name,
      slug,
      avatar,
      title
    },
    category->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0..2] {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    heroImage,
    publishedAt,
    readTime,
    author->{
      name,
      slug,
      avatar,
      title
    },
    category->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get related posts (same category, excluding current post)
export const relatedPostsQuery = groq`
  *[_type == "post" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc) [0..2] {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    heroImage,
    publishedAt,
    readTime,
    author->{
      name,
      slug,
      avatar,
      title
    },
    category->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// Get all tags
export const tagsQuery = groq`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// Get all authors
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    avatar,
    title,
    bio,
    social,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// Search posts
export const searchPostsQuery = groq`
  *[_type == "post" && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    pt::text(body) match $searchTerm + "*"
  )] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    excerpt,
    heroImage,
    publishedAt,
    readTime,
    author->{
      name,
      slug,
      avatar,
      title
    },
    category->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    }
  }
`

// Get post sitemap data
export const sitemapQuery = groq`
  *[_type == "post"] {
    slug,
    publishedAt,
    _updatedAt
  }
`

// ===== TYPESCRIPT TYPES =====

// types/blog.ts
export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  avatar?: any;
  title?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  postCount?: number;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
  postCount?: number;
}

export interface Tag {
  _id: string;
  title: string;
  slug: { current: string };
  postCount?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  subtitle?: string;
  slug: { current: string };
  excerpt?: string;
  heroImage?: any;
  body?: any[];
  publishedAt: string;
  readTime?: number;
  featured?: boolean;
  author: Author;
  category: Category;
  tags?: Tag[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
}
