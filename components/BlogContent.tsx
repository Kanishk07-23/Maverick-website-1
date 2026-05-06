'use client';

import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
}

export default function BlogContent({ content }: Props) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="font-outfit font-black text-[var(--foreground)] uppercase tracking-tighter leading-[0.88] mt-16 mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-outfit font-black text-[var(--foreground)] uppercase tracking-tighter leading-[0.9] mt-16 mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-outfit font-black text-[var(--foreground)] uppercase tracking-tighter mt-12 mb-4"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-lg md:text-xl text-[var(--foreground)] opacity-80 leading-relaxed mb-8 font-medium">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-black text-[var(--foreground)] opacity-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic opacity-70">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="my-8 space-y-3 border-l-2 border-[var(--border)] pl-8">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-8 space-y-3 border-l-2 border-[var(--border)] pl-8 list-decimal list-inside">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-lg text-[var(--foreground)] opacity-80 font-medium leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-10 border-l-4 border-[var(--foreground)] pl-8 py-2">
              <div className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[var(--foreground)] leading-snug">
                {children}
              </div>
            </blockquote>
          ),
          hr: () => (
            <hr className="my-16 border-[var(--border)]" />
          ),
          table: ({ children }) => (
            <div className="my-10 overflow-x-auto">
              <table className="w-full border-collapse border border-[var(--border)]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[var(--inverted-bg)] text-[var(--inverted-text)]">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-6 py-4 text-left label-sm uppercase tracking-[0.15em] border border-[var(--border)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 text-[var(--foreground)] opacity-80 border border-[var(--border)] font-medium">
              {children}
            </td>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[var(--surface)] transition-colors">
              {children}
            </tr>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <code className="block bg-[var(--surface)] border border-[var(--border)] p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                  {children}
                </code>
              );
            }
            return (
              <code className="bg-[var(--surface)] border border-[var(--border)] px-2 py-1 font-mono text-sm">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-8 overflow-x-auto">{children}</pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity font-semibold"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
