---
date: 2024-07-31
slug: cpp-calculate-file-crc64
title: C++ 如何计算文件 crc64-ECMA
description: 关于此页的简短描述
authors: [yinpo]
tags: [c++]
keywords: [c++, crc-64, crc-64-ECMA]
---

费了好大的功夫，在WIKI上磕磕绊绊的大概看懂了[什么是CRC](/blog/what-is-crc)。

所以实现的步骤无非就是按字节逐个进行异或计算，例如CRC-8就是CRC位宽为8，生成多项式编码为9位，就是按照9位逐个计算

那么如果提前提前准备一个涵盖所有编码结果的预算表，就能快速的遍历，而这个预算表的长度则为2^10 - 1

## 为什么不用js
