import React from 'react';
import { PortableText } from '@portabletext/react';

// Helper function to build Sanity image URLs
const buildImageUrl = (imageRef, options = {}) => {
  if (!imageRef || !imageRef.asset || !imageRef.asset._ref) {
    return null;
  }
  
  const ref = imageRef.asset._ref;
  const [, id, dimensions, format] = ref.split('-');
  
  // Replace with your actual Sanity project configuration
  const projectId = 'your-project-id';
  const dataset = 'production';
  
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
  
  const params = new URLSearchParams();
  if (options.width) params.append('w', options.width);
  if (options.height) params.append('h', options.height);
  if (options.quality) params.append('q', options.quality);
  if (options.format) params.append('fm', options.format);
  if (options.fit) params.append('fit', options.fit);
  if (options.auto) params.append('auto', options.auto);
  
  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
};

// Helper function to create components with specific alignment
const createAlignedComponents = (alignment = 'left') => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }[alignment];

  return {
    block: {
      normal: ({ children }) => (
        <p className={`mb-4 text-gray-200 leading-relaxed ${alignmentClass}`}>
          {children}
        </p>
      ),
      h1: ({ children }) => (
        <h1 className={`text-3xl font-bold mb-4 text-gray-200 ${alignmentClass}`}>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className={`text-2xl font-bold mb-3 text-gray-200 ${alignmentClass}`}>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className={`text-xl font-bold mb-3 text-gray-200 ${alignmentClass}`}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className={`text-lg font-bold mb-2 text-gray-200 ${alignmentClass}`}>
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`border-l-4 border-blue-500 pl-4 italic my-4 text-gray-200 ${alignmentClass}`}>
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }) => (
        <a 
          href={value.href}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
    },
  };
};

// Custom components for Portable Text
const portableTextComponents = {
  // Handle custom block types
  types: {
    // Custom aligned text blocks - FIXED VERSION
    alignedText: ({ value }) => {
      const alignment = value.alignment || 'left';
      
      // Create components with the specific alignment
      const alignedComponents = createAlignedComponents(alignment);
      
      return (
        <div className="my-4">
          <PortableText 
            value={value.text} 
            components={alignedComponents}
          />
        </div>
      );
    },

    // Custom paragraph with spacing and font size control
    paragraph: ({ value }) => {
      const alignment = value.alignment || 'left';
      const spacing = value.spacing || 'normal';
      const fontSize = value.fontSize || 'normal';
      
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      const spacingClass = {
        small: 'mb-2',
        normal: 'mb-4',
        large: 'mb-6',
        'extra-large': 'mb-8'
      }[spacing];
      
      const fontSizeClass = {
        small: 'text-sm',
        normal: 'text-base',
        large: 'text-lg',
        'extra-large': 'text-xl'
      }[fontSize];
      
      const paragraphComponents = {
        block: {
          normal: ({ children }) => (
            <p className={`text-gray-200 leading-relaxed ${alignmentClass} ${spacingClass} ${fontSizeClass}`}>
              {children}
            </p>
          ),
        },
        marks: portableTextComponents.marks,
      };
      
      return (
        <div>
          <PortableText 
            value={value.text} 
            components={paragraphComponents}
          />
        </div>
      );
    },

    // Custom list with enhanced styling
    customList: ({ value }) => {
      const listType = value.listType || 'bullet';
      const alignment = value.alignment || 'left';
      const spacing = value.spacing || 'normal';
      
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      }[alignment];
      
      const spacingClass = {
        tight: 'mb-1',
        normal: 'mb-2',
        loose: 'mb-4'
      }[spacing];
      
      const listStyleClass = {
        bullet: 'list-disc',
        number: 'list-decimal',
        roman: 'list-roman',
        alpha: 'list-alpha'
      }[listType];
      
      const ListTag = ['bullet'].includes(listType) ? 'ul' : 'ol';
      
      // Custom styles for roman and alpha lists
      const customListStyle = {
        roman: { listStyleType: 'upper-roman' },
        alpha: { listStyleType: 'upper-alpha' }
      }[listType] || {};
      
      return (
        <ListTag 
          className={`my-4 ${listStyleClass} list-inside ${alignmentClass}`}
          style={customListStyle}
        >
          {value.items?.map((item, index) => (
            <li key={index} className={`text-gray-200 ${spacingClass}`}>
              <PortableText 
                value={item.text} 
                components={{
                  block: {
                    normal: ({ children }) => <span>{children}</span>
                  },
                  marks: portableTextComponents.marks,
                }}
              />
            </li>
          ))}
        </ListTag>
      );
    },
    
    // Custom quote blocks
    quote: ({ value }) => {
      const alignment = value.alignment || 'center';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      }[alignment];
      
      return (
        <blockquote className={`my-6 p-6 bg-gray-50 border-l-4 border-blue-500 ${alignmentClass}`}>
          <p className="text-lg italic text-gray-200 mb-4">"{value.text}"</p>
          {value.author && (
            <cite className="text-sm text-gray-200">
              <span className="font-semibold">{value.author}</span>
              {value.authorTitle && <span>, {value.authorTitle}</span>}
            </cite>
          )}
        </blockquote>
      );
    },
    
    // Handle images with alignment
    image: ({ value }) => {
      const imageUrl = buildImageUrl(value, {
        width: 800,
        height: 400,
        quality: 80,
        format: 'webp',
        fit: 'crop',
        auto: 'format'
      });
      
      const alignment = value.alignment || 'center';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
      }[alignment];
      
      if (!imageUrl) return null;
      
      return (
        <figure className={`my-6 ${alignmentClass}`}>
          <img
            src={imageUrl}
            alt={value.alt || 'Post image'}
            className="inline-block h-auto rounded-lg max-w-full"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-200 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  
  // Handle lists
  list: {
    // Bullet lists
    bullet: ({ children }) => (
      <ul className="my-4 list-disc list-inside text-gray-200">
        {children}
      </ul>
    ),
    // Numbered lists
    number: ({ children }) => (
      <ol className="my-4 list-decimal list-inside text-gray-200">
        {children}
      </ol>
    ),
  },
  
  // Handle list items
  listItem: {
    // Bullet list items
    bullet: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    // Numbered list items
    number: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
  },
  
  // Handle regular block styles with alignment and lists
  block: {
    // Normal paragraph
    normal: ({ children, value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <p className={`mb-4 text-gray-200 leading-relaxed ${alignmentClass}`}>
          {children}
        </p>
      );
    },
    
    // Headings with alignment
    h1: ({ children, value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <h1 className={`text-3xl font-bold mb-4 text-gray-200 ${alignmentClass}`}>
          {children}
        </h1>
      );
    },
    
    h2: ({ children, value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <h2 className={`text-2xl font-bold mb-3 text-gray-200 ${alignmentClass}`}>
          {children}
        </h2>
      );
    },
    
    h3: ({ children, value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <h3 className={`text-xl font-bold mb-3 text-gray-200 ${alignmentClass}`}>
          {children}
        </h3>
      );
    },
    
    h4: ({ children, value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <h4 className={`text-lg font-bold mb-2 text-gray-200 ${alignmentClass}`}>
          {children}
        </h4>
      );
    },
    
    // Blockquote with alignment
    blockquote: ({ children, value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <blockquote className={`border-l-4 border-blue-500 pl-4 italic my-4 text-gray-200 ${alignmentClass}`}>
          {children}
        </blockquote>
      );
    },
  },
  
  // Handle text marks/annotations
  marks: {
    // Links
    link: ({ children, value }) => (
      <a 
        href={value.href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    
    // Strong/bold
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    
    // Emphasis/italic
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    
    // Inline code
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
};

// Main component to render Portable Text content
const PortableTextRenderer = ({ content }) => {
  if (!content) return null;
  
  return (
    <div className="prose max-w-none">
      <PortableText 
        value={content} 
        components={portableTextComponents}
      />
    </div>
  );
};

// Example usage in your blog post component
const BlogPost = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      
      {/* Render the post body using Portable Text */}
      <PortableTextRenderer content={post.body} />
    </article>
  );
};

// Alternative simpler approach - Override alignment with !important or higher specificity
const simplePortableTextComponents = {
  types: {
    // Simple aligned text - uses CSS to override nested alignment
    alignedText: ({ value }) => {
      const alignment = value.alignment || 'left';
      const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
      }[alignment];
      
      return (
        <div className={`my-4 ${alignmentClass}`}>
          <div style={{ textAlign: alignment }}>
            <PortableText 
              value={value.text} 
              components={{
                block: {
                  // Override all block styles to inherit alignment
                  normal: ({ children }) => (
                    <p className="mb-4 text-gray-200 leading-relaxed" style={{ textAlign: 'inherit' }}>
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-4 text-gray-200" style={{ textAlign: 'inherit' }}>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-3 text-gray-200" style={{ textAlign: 'inherit' }}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mb-3 text-gray-200" style={{ textAlign: 'inherit' }}>
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-bold mb-2 text-gray-200" style={{ textAlign: 'inherit' }}>
                      {children}
                    </h4>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="my-4 list-disc list-inside text-gray-200" style={{ textAlign: 'inherit' }}>
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="my-4 list-decimal list-inside text-gray-200" style={{ textAlign: 'inherit' }}>
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li className="mb-2">{children}</li>,
                  number: ({ children }) => <li className="mb-2">{children}</li>,
                },
                marks: portableTextComponents.marks,
              }}
            />
          </div>
        </div>
      );
    },

    // Custom paragraph block
    paragraph: portableTextComponents.types.paragraph,
    
    // Custom list block
    customList: portableTextComponents.types.customList,

    quote: portableTextComponents.types.quote,
    image: portableTextComponents.types.image,
  },
  
  // Regular blocks with alignment field
  block: ({ children, value }) => {
    const alignment = value.alignment || 'left';
    const alignmentClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    }[alignment];
    
    switch (value.style) {
      case 'h1':
        return <h1 className={`text-3xl font-bold mb-4 text-gray-200 ${alignmentClass}`}>{children}</h1>;
      case 'h2':
        return <h2 className={`text-2xl font-bold mb-3 text-gray-200 ${alignmentClass}`}>{children}</h2>;
      case 'h3':
        return <h3 className={`text-xl font-bold mb-3 text-gray-200 ${alignmentClass}`}>{children}</h3>;
      case 'h4':
        return <h4 className={`text-lg font-bold mb-2 text-gray-200 ${alignmentClass}`}>{children}</h4>;
      case 'blockquote':
        return <blockquote className={`border-l-4 border-blue-500 pl-4 italic my-4 text-gray-200 ${alignmentClass}`}>{children}</blockquote>;
      case 'normal':
      default:
        return <p className={`mb-4 text-gray-200 leading-relaxed ${alignmentClass}`}>{children}</p>;
    }
  },
  
  // Handle lists
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc list-inside text-gray-200">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal list-inside text-gray-200">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  
  marks: portableTextComponents.marks,
};

export { 
  PortableTextRenderer, 
  portableTextComponents, 
  simplePortableTextComponents,
  createAlignedComponents,
  BlogPost 
};