import React from "react";
import clsx from "clsx";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import type { Props } from "@theme/BlogListPage";
import type { Tag } from "@docusaurus/utils/src/tags";
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData";
import { HtmlClassNameProvider, ThemeClassNames } from "@docusaurus/theme-common";
import Metadata from "./Metadata";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

interface IItemsList {
  [key: string]: Array<{ tags: Array<Tag>; date: string; title: string; permalink: string }>;
}
function BlogListPageContent(props: Props): JSX.Element {
  const { metadata, items } = props;
  const itemsList = items.reduce((acc, item) => {
    const date = new Date(item.content.metadata.date);
    const config = {
      tags: item.content.metadata.tags,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      title: item.content.metadata.title,
      permalink: item.content.metadata.permalink,
    };
    if (acc[`${date.getFullYear()}`]) {
      acc[`${date.getFullYear()}`].push(config);
    } else {
      acc[`${date.getFullYear()}`] = [config];
    }

    return acc;
  }, {} as IItemsList);

  return (
    <BlogLayout>
      {Object.keys(itemsList)
        .reverse()
        .map((key) => {
          const list = itemsList[key];
          return (
            <div key={key}>
              <div className={styles["sort-title"]}>
                {key} ({list.length})
              </div>
              <div className={styles["sort-container"]}>
                {list.map((item) => {
                  return (
                    <div className={styles["item-container"]} key={item.permalink}>
                      <div className={styles["item-head"]}>
                        <Link
                          className={styles.archiveItem}
                          href={item.permalink}
                          autoAddBaseUrl={true}
                          isNavLink
                        >
                          {item.title}
                        </Link>
                      </div>

                      <div className={styles["item-meta"]}>
                        <div className={styles["item-tags"]}>
                          {item.tags.map((tag) => (
                            <a
                              className={styles["item-tag-btn"]}
                              href={tag.permalink}
                              key={tag.label}
                            >
                              {tag.label}
                            </a>
                          ))}
                        </div>
                        <p className={styles["item-date"]}>{item.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
          );
        })}
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}
    >
      <Metadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
