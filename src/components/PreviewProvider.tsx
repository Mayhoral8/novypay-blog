// components/PreviewProvider.tsx
'use client'
import { LiveQueryProvider } from '@sanity/preview-kit'
import { previewClient } from '@/lib/sanity/sanity'

interface PreviewProviderProps {
  children: React.ReactNode
  token: string
}

export default function PreviewProvider({ children, token }: PreviewProviderProps) {
  if (!token) {
    throw new Error('Missing token for preview mode')
  }

  return (
    <LiveQueryProvider 
      client={previewClient.withConfig({ token })}
      logger={console}
    >
      {children}
    </LiveQueryProvider>
  )
}