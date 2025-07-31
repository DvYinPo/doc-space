import { useEffect, useRef, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";

interface IProps {}

export default function Comments(props: IProps): JSX.Element {
  const commentBox = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const commentScript = document.createElement("script");
    if (commentBox && commentBox.current && commentBox.current.childNodes.length === 0) {
      commentScript.async = true;
      commentScript.src = "https://utteranc.es/client.js";
      commentScript.setAttribute("repo", "DvYinPo/doc-space");
      commentScript.setAttribute("issue-term", "url");
      commentScript.setAttribute("label", "github-page-comments");
      commentScript.setAttribute("theme", `github-${colorMode}`);
      commentScript.setAttribute("crossorigin", "anonymous");
      commentBox.current.appendChild(commentScript);
    }

    return () => {
      commentScript.remove();
    };
  }, []);

  useEffect(() => {
    const utterances = commentBox.current.querySelector("iframe");

    if (commentBox && commentBox.current && utterances && utterances.contentWindow) {
      const message = {
        type: "set-theme",
        theme: `github-${colorMode}`,
      };
      utterances.contentWindow.postMessage(message, "https://utteranc.es");
    }
  }, [colorMode]);

  return <div ref={commentBox} className="comments" />;
}
