---
date: 2025-07-22
slug: electron-native-api-call
title: 在 Electron 项目中调用原生API
description: 在 Electron 项目中调用原生API
authors: [yinpo]
tags: [c++, electron]
keywords: [css, math, progress-bar]
---

# 效果展示

本质上 Electron 调用原生 API 的逻辑就是 Node 环境对原生 API 的调用，与 Electron 没有根本上的联系，Electron 只是提供了运行 Nodejs 的环境，并没有引入特殊机制。

所以问题可以简化为如何在 Nodejs 环境中调用原生 API。这里探索两种方案：

1. WebAssembly
2. Node Addons

<!-- truncate -->

## WebAssembly 与 Node Addons

- WebAssembly 是一种可移植、体积小、加载快且兼容 Web 的二进制指令格式，设计用于在 Web 上高效执行。它最初是为浏览器设计的，但现在也广泛应用于服务器端(Node.js)环境。
- Node.js Addons 是用 C/C++编写的动态链接共享对象，使用 V8 和 Node.js 提供的 API 直接与 JavaScript 交互。它们被编译为.node 文件，由 Node.js 直接加载。

| 维度         | WebAssembly             | Node.js Addons   |
| ------------ | ----------------------- | ---------------- |
| **性能**     | 接近原生(慢 10-20%)     | 原生性能         |
| **安全性**   | 高(沙箱环境)            | 低(完全系统访问) |
| **开发语言** | C/C++/Rust/Go 等        | 主要是 C/C++     |
| **调试难度** | 中等                    | 高               |
| **部署难度** | 低(分发.wasm 文件)      | 高(需要编译)     |
| **跨平台**   | 一次编译，到处运行      | 需为每个平台编译 |
| **API 访问** | 受限(需 JS 胶水代码)    | 完全访问         |
| **内存管理** | 线性内存/依赖语言运行时 | 直接 V8 内存访问 |
| **线程支持** | 有限(通过 Web Workers)  | 完整 OS 线程支持 |
