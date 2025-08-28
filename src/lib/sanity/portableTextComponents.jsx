import React from "react";
import { PortableText } from "@portabletext/react";

// Custom components for Portable Text
const portableTextComponents = {
  block: {
    normal: ({ children }) => <div className="mb-2">{children}</div>,
    paragraph: ({ children }) => (
      <p className="mb-4 leading-relaxed indent-8">{children}</p>
    ),
    largeParagraph: ({ children }) => (
      <p className="mb-6 text-lg leading-loose indent-8">{children}</p>
    ),
    smallParagraph: ({ children }) => (
      <p className="mb-3 text-sm leading-normal indent-6">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4">{children}</ol>
    ),
  },
  listItem: ({ children }) => <li className="mb-1">{children}</li>,
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    // Text alignment marks
    left: ({ children }) => <div className="text-left w-full">{children}</div>,
    center: ({ children }) => (
      <div className="text-center w-full">{children}</div>
    ),
    right: ({ children }) => (
      <div className="text-right w-full">{children}</div>
    ),
  },
};

// Main component to render Portable Text content
const PortableTextRenderer = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose max-w-none">
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
};

export { PortableTextRenderer, portableTextComponents };
