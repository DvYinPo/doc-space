import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import type { Options as BlogOptions } from "@docusaurus/plugin-content-blog";

const config: Config = {
  title: "Documents Space",
  tagline: "Everything is cool!",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://dvyinpo.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/doc-space/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "dvyinpo", // Usually your GitHub org/user name.
  projectName: "doc-space", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          path: "./docs",
          routeBasePath: "/docs",
        },
        blog: {
          blogTitle: "Document space blog",
          blogDescription: "Yinpo document space blog.",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          showReadingTime: true,
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} yinpo`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "archive-blog",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "archive",
        /**
         * Path to data on filesystem relative to site dir.
         */
        blogSidebarTitle: "Archived blogs",
        blogSidebarCount: 0,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        blogListComponent: "/src/theme/ArchivedBlogListPage",
        path: "./archive",
        authorsMapPath: "../blog/authors.yml",
        tags: "../blog/tags.yml",
      } satisfies BlogOptions,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    metadata: [
      {
        name: "description",
        content:
          "yinpo document space, which include blog, tools and wrapper documents etc. 欢迎来到Yinpo的空间，这里分享关于技术、生活和学习的文章。",
      },
      {
        name: "keywords",
        content:
          "yinpo, dvyinpo, yinpo document space, doc-space, github, github.io, dvyinpo.github.io, github pages, blog, tools, wrapper documents, 博客, 技术, 生活, 学习, 编程",
      },
      {
        name: "author",
        content: "yinpo",
      },
    ],
    navbar: {
      title: "Doc Space",
      logo: {
        alt: "doc space",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "dropdown",
          label: "其他",
          position: "right",
          items: [{ to: "/archive", label: "归档" }],
        },
        { type: "search", position: "right" },
      ],
    },
    footer: undefined,
    algolia: {
      appId: "46OC3C8LHM",
      // Public API key: it is safe to commit it
      apiKey: "e6329a618bde1dee32f4a35a548fa421",
      indexName: "dvyinpoio",

      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: "/doc-space/", // or as RegExp: /\/docs\//
        to: "/",
      },
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: false,
      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
