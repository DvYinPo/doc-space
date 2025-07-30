---
date: 2024-10-15
slug: seo-optimisation
title: SEO 优化
description: 关于此页的简短描述
authors: [yinpo]
tags: [document]
keywords: [SEO]
---

什么是 SEO？如何做好 SEO 优化？

<!-- truncate -->

## 搜索引擎

动态内容抓取
现代网页经常使用 JavaScript 生成动态内容，这对传统的爬虫来说是一种挑战。
为了处理这种情况，许多搜索引擎已经能够执行 JavaScript 代码，以便抓取动态生成的内容。

## Canonical Tags

[Canonical Tags](https://developer.chrome.com/docs/lighthouse/seo/canonical)，也称为规范标签，是 HTML 中的一种标签，用于指示搜索引擎某个网页的首选版本。
它的主要作用是防止重复内容问题，提高 SEO 效果。
当多个 URL 产生相同或相似内容时，Canonical Tags 帮助告知搜索引擎哪个 URL 是主要版本，从而将权重集中在该 URL 上。

Canonical Tag 使用`<link>`标签，并放置在 HTML 文档的`<head>`部分中。其基本语法如下：

```html
<link rel="canonical" href="https://www.example.com/preferred-url/" />
```

作用和好处

1. 避免重复内容惩罚：

当网站有多个 URL 指向相同或相似内容时，搜索引擎可能会视其为重复内容。Canonical Tags 可以帮助指定唯一的首选 URL，从而避免潜在的 SEO 惩罚。

2.  集中页面权重：

多个重复或相似页面会分散页面权重，而 Canonical Tags 可以将这些权重集中到首选 URL 上，提升该页面在搜索引擎中的排名。

3.  改善爬虫效率：

搜索引擎蜘蛛会消耗资源去爬取和处理重复内容。通过使用 Canonical Tags，可以减少不必要的抓取次数，提高爬虫效率。

4. 提高用户体验：

使用 Canonical Tags 可以确保用户通过搜索引擎结果访问到最合适的页面版本，提升用户体验。

## 路由模式

react-router 或 Vue Router 中的路由模式对搜索引擎优化（SEO）有一定的影响。

1. Hash 模式 (hash): 默认使用哈希符号（#）来创建路由。例如，http://example.com/#/about。这种模式在浏览器中不会触发页面重新加载，但是对于 SEO 并不友好，因为搜索引擎通常不会索引 # 后面的内容。

2. History 模式 (history): 通过 HTML5 的 History API 创建干净的 URL，例如，http://example.com/about。这种模式对 SEO 更加友好，因为 URL 看起来像传统的网页路径，搜索引擎可以更好地抓取和索引这些页面。
