// lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Main client for published content
export const client = createClient({
  projectId: "y4zzsrxn",
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN in production, not in dev
  // token: process.env.SANITY_API_TOKEN, // Add API token for authenticated requests
});

// Preview client for draft content
export const previewClient = createClient({
  projectId: "y4zzsrxn",
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Never use CDN for preview/draft content
  token:"skf0jm299t9wJRvCZhdz26ICHPJRG2tNG5X1IS5VQjDps5pOeMt3zuStAmuMnmIqpBetKk6vgWUEFWes9FIPtIAdoCoGSHB20cP9gkh0mPsjhul5L2gzrS8sfsAOZuvwVpwx5BZ93WxagOetMXPI21ysra88g0YIDAxF1KrR9KRY3zhIljCp", // Required for accessing drafts
  perspective: 'previewDrafts', // This is the key setting for seeing drafts
  ignoreBrowserTokenWarning: true,
  withCredentials: true,
});

// Helper function to get the right client based on preview mode
export function getClient(preview: boolean = false) {
  if (preview) {
    return previewClient;
  }
  return client;
}

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Alternative: Single client with dynamic configuration
export function createSanityClient(preview: boolean = false) {
  return createClient({
    projectId: "y4zzsrxn",
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: !preview, // Disable CDN in preview mode
    token: "skf0jm299t9wJRvCZhdz26ICHPJRG2tNG5X1IS5VQjDps5pOeMt3zuStAmuMnmIqpBetKk6vgWUEFWes9FIPtIAdoCoGSHB20cP9gkh0mPsjhul5L2gzrS8sfsAOZuvwVpwx5BZ93WxagOetMXPI21ysra88g0YIDAxF1KrR9KRY3zhIljCp",
    perspective: preview ? 'previewDrafts' : 'published',
  });
}