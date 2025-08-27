import React from "react";
import "./admonition.css";

type AdmonitionMarker = { type: string; content: string } | null;

const parseMarker = (s: string): AdmonitionMarker => {
  const m = s.match(/^\s*\[!\s*([A-Za-z0-9_-]+)\s*\]\s*(.*)$/);
  if (!m) return null;
  return { type: m[1].toLowerCase(), content: m[2] ? m[2].trim() : "" };
};

const AdmonitionBlockquote: React.FC<any> = ({ node, children, ...props }) => {
  const childArray = React.Children.toArray(children);

  if (childArray.length > 0) {
    const first = childArray[1];
    let firstText = "";

    if (React.isValidElement(first)) {
      const pChildren = (first.props && first.props.children) ?? "";
      if (typeof pChildren === "string") firstText = pChildren;
      else if (Array.isArray(pChildren)) {
        firstText = pChildren.map((c: any) => (typeof c === "string" ? c : "")).join("");
      } else if (pChildren && typeof pChildren === "object") {
        if (typeof pChildren.props?.children === "string") firstText = pChildren.props.children;
      }
    } else if (typeof first === "string") {
      firstText = first;
    }

    const mark = parseMarker(firstText || "");

    if (mark) {
      const title = mark.type.charAt(0).toUpperCase() + mark.type.slice(1);

      // 处理第一段如果除了 marker 还有其余内容的情况
      let contentChildren = childArray.slice(1, -1);
      const markerOnly =
        firstText.trim() === `[!${mark.type}]` ||
        firstText.trim() === `[!${mark.type}]${mark.content ? " " + mark.content : ""}`;

      if (!markerOnly && firstText.trim().startsWith("[!")) {
        const rest = firstText.replace(/^\s*\[!\s*[A-Za-z0-9_-]+\s*\]\s*/, "");
        if (rest) {
          contentChildren = [<p key="p-rest">{rest}</p>, ...childArray.slice(2, -1)];
        } else {
          contentChildren = [...childArray.slice(2, -1)];
        }
      }

      return (
        <div className={`admonition admonition-${mark.type}`} {...props}>
          <div className="admonition-title">{title}</div>
          <div className="admonition-content">{contentChildren}</div>
        </div>
      );
    }
  }

  return <blockquote {...props}>{children}</blockquote>;
};

export default AdmonitionBlockquote;
