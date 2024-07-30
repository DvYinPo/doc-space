---
date: 2024-07-30
slug: what-is-crc
title: CRC 原理
description: 什么是CRC多项式？如何计算CRC编码？为什么不同的多项式有不同的效果？
authors: [yinpo]
tags: [algorithm]
keywords: [algorithm, crc, crc-64, crc-64-ecma, crc-64-iso]
---

# CRC (cyclic redundancy check)

CRC 是一种用于检测数据传输错误或数据损坏的算法。

`CRC-n-XX` 其中 n 表示 CRC 的位数，XX 表示 CRC 的标准名。例如：

1. CRC-64-ECMA-182: 表示 ECMA-182 标准的 64 位 CRC。
2. CRC-64-ISO: 表示 ISO 3309 (HDLC) 标准的 64 位 CRC。

## 数据完整性 Data integrity

> Firstly, as there is no authentication, an attacker can edit a message and recompute the CRC without the substitution being detected.

没有身份验证，攻击者可以编辑`message`来骗过 CRC 校验，怎么编辑我也不知道。

> Secondly, unlike cryptographic hash functions, CRC is an easily reversible function, which makes it unsuitable for use in digital signatures.

CRC 函数可逆，不适用于数字签名。

> Thirdly, CRC satisfies a relation similar to that of a linear function (or more accurately, an affine function): CRC(x$\oplus$y) = CRC(x) $\oplus$ CRC(y) $\oplus$ c

## 计算过程 Computation

1. 首先将多项式系数以二进制形式表示。
2. 获取`message`的二进制编码
3. 填充 n(多项式长度) 个 0 到 `message`二进制编码的末尾。
4. 设置初始值，通常全部为0。除非特定的协议要求其他的值。
5. 从最高位开始，逐位进行异或$\oplus$运算，如果最高为0则不进行运算，直接跳过。
6. 直到`message`的二进制编码的末尾，也就是倒数第n+1位。
7. 这样就会将`message`二进制编码的左边全部归零，只剩下右侧n位可以为非零。
8. 这剩余的n位就是CRC的值。除非某些特定的规范有后续操作。
9. 将CRC的值加到`message`二进制编码的末尾，然后重新进行步骤5~8，会得到全零。

举例，`message`=`11010011101100`，3位CRC编码`CRC-3`的多项式为$x^3+x+1$，系数编码为`1011`，那么计算过程如下：
```text
11010011101100 000 <--- 右侧填充3位0
1011               <--- divisor (4 bits) = x³ + x + 1
------------------
01100011101100 000
 1011
------------------
00111011101100 000
  1011
------------------
00010111101100 000
   1011
------------------
00000001101100 000 <--- 前面的最高位为0，所以不进行运算，直接跳过了
       1011
------------------
00000000110100 000
        1011
------------------
00000000011000 000
         1011
------------------
00000000001110 000
          1011
------------------
00000000000101 000
           101 1
-----------------
00000000000000 100 <--- 余数 (3 bits) 此时dividend全部为零
```

此时CRC的值为100。想要验证，只需要将CRC的值加到`message`二进制编码的末尾，然后重新进行步骤5~8，会得到全零。

```text
11010011101100 100 <--- 右侧填充CRC值
1011               <--- divisor
01100011101100 100
 1011
00111011101100 100
......
00000000001110 100
          1011
00000000000101 100
           101 1
------------------
00000000000000 000
```

## 多项式 polynomial

> Specification of a CRC code requires definition of a so-called generator polynomial. This polynomial becomes the divisor in a polynomial long division, which takes the message as the dividend and in which the quotient is discarded and the remainder becomes the result.

CRC 的多项式可以是任意的，但通常使用以下多项式：

| name        | 标准                    | 多项式编码  |
| ----------- | ----------------------- | ----------- |
| CRC-32      | ISO、IEEE、ITU...太多了 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2             | Row 2 Col 3 |


- CRC-64-ECMA-182: `0x42F0E1EBA9EA3693`
- CRC-64-ECMA-182: `0x42F0E1EBA9EA3693`
