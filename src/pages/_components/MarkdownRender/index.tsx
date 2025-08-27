import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AdmonitionBlockquote from "./BlockQuote";

type Props = {
  source: string;
  className?: string;
};

export default function MarkdownRendererWithAdmonition({ source, className = "" }: Props) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        children={source}
        remarkPlugins={[remarkGfm]}
        components={{
          blockquote: AdmonitionBlockquote,
        }}
      />
    </div>
  );
}
