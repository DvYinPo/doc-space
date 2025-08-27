import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";
import { useIssuesByLabel } from "../_hooks/useIssues";
import React, { useRef, useState } from "react";
import style from "./index.module.css";
import clsx from "clsx";
import Loading from "@site/src/pages/_components/Loading";
import IconWrite from "@site/src/assets/write.svg";
import useOverflow from "@site/src/pages/_hooks/useOverflow";
import MarkdownRender from "@site/src/pages/_components/MarkdownRender";

function ContentBlock({ text }) {
  const textRef = useRef(null);
  const isOverflow = useOverflow(textRef);
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <>
      <div ref={textRef} className={clsx([style["content-block"], { [style.open]: !collapsed }])}>
        <MarkdownRender source={text} />
      </div>
      {isOverflow.vertical && (
        <div className={style["expand-btn"]} onClick={() => setCollapsed(false)}>
          展开
        </div>
      )}
    </>
  );
}

export default function (): JSX.Element {
  const { issues, loading, error, hasMore, loadMore, refetch } = useIssuesByLabel({
    token:
      "Z2l0aHViX3BhdF8xMUFIQVBIS1EwbzNodzR5dlZwM0xPX3VXeUVJZW9rWnJkUklvZnVBN0xRUENLcHlORFZEZWZlYjlHMXUyaUF3dFpSNlVVTkRRUEx3NWhiZmc2",
    perPage: 20,
  });

  return (
    <Layout description="yinpo blogs showcase!">
      <div className={style["container"]}>
        <div className={style["feed"]}>
          {issues.map((item) => (
            <div className={style["post-item"]} key={item.id}>
              <div className={style["head"]}>
                <a className={style["avatar"]} href={item.author_url} target="_blank">
                  <img src={item.author_avatar_url} alt={item.author} />
                </a>
                <div className={style["meta"]}>
                  <div className={style["name"]}>{item.author}</div>
                  <div className={style["time"]}>{item.created_at}</div>
                </div>
              </div>

              {item.title && <div className={style["title"]}>{item.title}</div>}

              <ContentBlock text={item.content} />
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <Loading style={{ margin: "20px auto" }} />
      ) : (
        <div className={clsx([style["load-more"], { [style.disabled]: !hasMore }])}>
          {hasMore ? <span onClick={loadMore}>加载更多</span> : <span>没有更多了…</span>}
        </div>
      )}
      <a href="https://github.com/DvYinPo/doc-space/issues/new?template=page-notes.md" target="_blank">
        <IconWrite className={style["write-icon"]} />
      </a>
    </Layout>
  );
}
