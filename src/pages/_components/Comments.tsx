import { useEffect, useRef, useState } from "react";

interface IProps {
  dark?: boolean;
}

export default function Comments(props: IProps): JSX.Element {
  const commentBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commentScript = document.createElement("script");

    if (commentBox && commentBox.current && commentBox.current.childNodes.length === 0) {
      commentScript.async = true;
      commentScript.src = "https://utteranc.es/client.js";
      commentScript.setAttribute("repo", "DvYinPo/doc-space");
      commentScript.setAttribute("issue-term", "url");
      commentScript.setAttribute("label", "github-page-comments");
      commentScript.setAttribute("theme", "github-light");
      commentScript.setAttribute("crossorigin", "anonymous");
      commentBox.current.appendChild(commentScript);
    }

    return () => {
      commentScript.remove();
    };
  });

  return <div ref={commentBox} className="comments" />;
}
