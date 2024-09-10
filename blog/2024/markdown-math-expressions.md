---
date: 2024-09-10
slug: latex-math-expression-syntax
title: LaTeX 数学公式语法
description: LaTeX 数学公式语法介绍。
authors: [yinpo]
tags: [document]
keywords: [LaTeX, KaTeX, MathJax, math expression syntax]
---

# Markdown 中的数学公式

通常 markdown 中显示数学符号使用的是 LaTeX 语言，渲染工具主要是 KaTeX 和 MathJax。

- LaTeX 是排版系统和语言规范，支持复杂的数学公式、图表、参考文献等，LaTeX 是数学公式语法的基础。
- KaTeX 是一个 JavaScript 的显示引擎，用于在网页上渲染 LaTeX 数学公式，是一个快速、高效的库。
- MathJax 是一个 JavaScript 的显示引擎，用于在网页上高质量地呈现 LaTeX、MathML 和 AsciiMath 数学公式。

这里记录一下 LaTeX 系统中常见的数学符号语法。

<!-- truncate -->

## Operators

`$x + y$` $x + y$

`$x - y$` $x - y$

`$x \times y$` $x \times y$

`$x \div y$` $x \div y$

`$\dfrac{x}{y}$` $\dfrac{x}{y}$

`$\sqrt{x}$` $\sqrt{x}$

## Symbols

`$\pi \approx 3.14159$` $\pi \approx 3.14159$

`$\pm \, 0.2$` $\pm \, 0.2$

`$\dfrac{0}{1} \neq \infty$` $\dfrac{0}{1} \neq \infty$

`$0 < x < 1$` $0 < x < 1$

`$0 \leq x \leq 1$` $0 \leq x \leq 1$

`$x \geq 10$` $x \geq 10$

`$\forall \, x \in (1,2)$` $\forall \, x \in (1,2)$

`$\exists \, x \notin [0,1]$` $\exists \, x \notin [0,1]$

`$A \subset B$` $A \subset B$

`$A \subseteq B$` $A \subseteq B$

`$A \cup B$` $A \cup B$

`$A \cap B$` $A \cap B$

`$X \implies Y$` $X \implies Y$

`$X \impliedby Y$` $X \impliedby Y$

`$a \to b$` $a \to b$

`$a \Rightarrow b$` $a \Rightarrow b$

`$a \propto b$` $a \propto b$

## Greek Alphabets

| Symbol     | Small Letter  | Capital Letter | Symbol   | Small Letter | Capital Letter |
| ---------- | ------------- | -------------- | -------- | ------------ | -------------- |
| alpha      | $\alpha$      | $\Alpha$       | mu       | $\mu$        |                |
| beta       | $\beta$       | $\Beta$        | sigma    | $\sigma$     | $\Sigma$       |
| gamma      | $\gamma$      | $\Gamma$       | varsigma | $\varsigma$  |                |
| delta      | $\delta$      | $\Delta$       | upsilon  | $\upsilon$   | $\Upsilon$     |
| epsilon    | $\epsilon$    | $\Epsilon$     | xi       | $\xi$        | $\Xi$          |
| kappa      | $\kappa$      | $\Kappa$       | nu       | $\nu$        |                |
| psi        | $\psi$        | $\Psi$         | varphi   | $\varphi$    |                |
| digamma    | $\digamma$    |                | phi      | $\phi$       | $\Phi$         |
| theta      | $\theta$      | $\Theta$       | omega    | $\omega$     | $\Omega$       |
| vartheta   | $\vartheta$   |                | pi       | $\pi$        | $\Pi$          |
| lambda     | $\lambda$     | $\Lambda$      | eta      | $\eta$       |                |
| varepsilon | $\varepsilon$ |                | zeta     | $\zeta$      |                |

## Math Constructs

1. $\forall \; x \in X \quad \exists \; y \leq \epsilon$

`$\forall \; x \in X \quad \exists \; y \leq \epsilon$`

2. $P \left( A=2 \, \middle| \, \dfrac{A^2}{B}>4 \right)$

`$P \left( A=2 \, \middle| \, \dfrac{A^2}{B}>4 \right)$`

3. $f(x) = x^2 - x^\frac{1}{\pi}$

`$f(x) = x^2 - x^\frac{1}{\pi}$`

4. $f(X,n) = X_n + X_{n-1}$

`$f(X,n) = X_n + X_{n-1}$`

5. $f(x) = \sqrt[3]{2x} + \sqrt{x-2}$

`$f(x) = \sqrt[3]{2x} + \sqrt{x-2}$`

6. $\mathrm{e} = \sum_{n=0}^{\infty} \dfrac{1}{n!}$

`$\mathrm{e} = \sum_{n=0}^{\infty} \dfrac{1}{n!}$`

7. $\prod_{i=1}^{n} x_i - 1$

`$\prod_{i=1}^{n} x_i - 1$`

8. $\lim_{x \to 0^+} \dfrac{1}{x} = \infty$

`$\lim_{x \to 0^+} \dfrac{1}{x} = \infty$`

9. $\int_a^b y \: \mathrm{d}x$

`$\int_a^b y \: \mathrm{d}x$`

10. $\log_a b = 1$

`$\log_a b = 1$`

11. $\dfrac{n!}{k!(n-k)!} = \binom{n}{k}$

`$\dfrac{n!}{k!(n-k)!} = \binom{n}{k}$`

## Functions

$$
f(x)=
\begin{cases}
1/d_{ij} & \quad \text{when $d_{ij} \leq 160$}\\
0 & \quad \text{otherwise}
\end{cases}
$$

```test
$$
f(x)=
\begin{cases}
1/d_{ij} & \quad \text{when $d_{ij} \leq 160$}\\
0 & \quad \text{otherwise}
\end{cases}
$$
```

## Matrices

$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
$$

```test
$$
\begin{matrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{matrix}
$$
```

---

$$
M =
\begin{bmatrix}
\frac{5}{6} & \frac{1}{6} & 0 \\[0.3em]
\frac{5}{6} & 0 & \frac{1}{6} \\[0.3em]
0 & \frac{5}{6} & \frac{1}{6}
\end{bmatrix}
$$

```
$$
M =
\begin{bmatrix}
\frac{5}{6} & \frac{1}{6} & 0 \\[0.3em]
\frac{5}{6} & 0 & \frac{1}{6} \\[0.3em]
0 & \frac{5}{6} & \frac{1}{6}
\end{bmatrix}
$$
```

---

$$
M =
\begin{pmatrix}
\frac{5}{6} & \frac{1}{6} & 0 \\[0.3em]
\frac{5}{6} & 0 & \frac{1}{6} \\[0.3em]
0 & \frac{5}{6} & \frac{1}{6}
\end{pmatrix}
$$

```
$$
M =
\begin{pmatrix}
\frac{5}{6} & \frac{1}{6} & 0 \\[0.3em]
\frac{5}{6} & 0 & \frac{1}{6} \\[0.3em]
0 & \frac{5}{6} & \frac{1}{6}
\end{pmatrix}
$$
```
