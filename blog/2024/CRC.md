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

`CRC-n-XX` 其中 n 表示 CRC 的位宽，XX 表示 CRC 的标准名。例如：

1. CRC-64-ECMA-182: 表示 ECMA-182 标准的 64 位 CRC。
2. CRC-64-ISO: 表示 ISO 3309 (HDLC) 标准的 64 位 CRC。

<!-- truncate -->

## 数据完整性 Data integrity

> Firstly, as there is no authentication, an attacker can edit a message and recompute the CRC without the substitution being detected.

没有身份验证，攻击者可以编辑`message`来骗过 CRC 校验，怎么编辑我也不知道。

> Secondly, unlike cryptographic hash functions, CRC is an easily reversible function, which makes it unsuitable for use in digital signatures.

CRC 函数可逆，不适用于数字签名。

> Thirdly, CRC satisfies a relation similar to that of a linear function (or more accurately, an affine function):
> $CRC(x \oplus y) = CRC(x) \oplus CRC(y) \oplus c$

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

> The most significant bit of a polynomial is always 1, and is not shown in the hex representations.
> 计算的时候是使用的多项式编码，是需要转为二进制并在最高为加1的，例如CRC-8的多项式编码是`0x07`，但是真正计算的时候用的是二进制编码 `100000111`。

举例，`message`=`11010011101100`，3位CRC编码`CRC-3`的多项式为$x^3+x+1$，系数编码为`1011`，那么计算过程如下：
```text
11010011101100 000 <--- 右侧填充3位0
1011               <--- divisor (4 bits) = x^3 + x + 1
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

接下来演示一个实际的例子：
对字符 `a` 计算 CRC-8 的值，多项式编码为`0x07`，CRC 初始值为 0x00，那么计算过程如下：

1. 首先获取字符 `a` 的字节码：`01100001`
2. 获取多项式`0x07`的二进制编码： `100000111`
3. 填补8位 0，开始异或计算
```text
01100001 00000000
 1000001 11
------------------
00100000 11000000
  100000 111
------------------
00000000 00100000

out: 00100000 => 20
```

如果有结果反转的话就是： reflect out: 00000100 => 04

## 多项式 Polynomial

> Specification of a CRC code requires definition of a so-called generator polynomial. This polynomial becomes the divisor in a polynomial long division, which takes the message as the dividend and in which the quotient is discarded and the remainder becomes the result.

CRC 的多项式可以是任意的，但常用的几个多项式如下：

| name         | 标准                  | 多项式编码(HEX)    | 多项式                                                                                                                                                                                                                       |
| ------------ | --------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRC-8        | DVB-S2                | 0xD5               | $ x^8 + x^7 + x^6 + x^4 + x^2 + 1 $                                                                                                                                                                                          |
| CRC-16-CCITT | HDLC FCS,Bluetooth... | 0x1021             | $x^{16}+x^{12}+x^{5}+1$                                                                                                                                                                                                      |
| CRC-32       | ISO,IEEE,ITU...       | 0x04C11DB7         | $$x^{32}+x^{26}+x^{23}+x^{22}+x^{16}+x^{12}+x^{11}+x^{10}+x^8+x^7+x^5+x^4+x^2+x+1$$                                                                                                                                          |
| CRC-64-ECMA  | ECMA-182              | 0x42F0E1EBA9EA3693 | $x^{64}+x^{62}+x^{57}+x^{55}+x^{54}+x^{53}+x^{52}+x^{47}+x^{46}+x^{45}+x^{40}+x^{39}+x^{38}+x^{37}+x^{35}+x^{33}+x^{32}+x^{31}+x^{29}+x^{27}+x^{24}+x^{23}+x^{22}+x^{21}+x^{19}+x^{17}+x^{13}+x^{12}+x^{10}+x^9+x^7+x^4+x+1$ |
| CRC-64-ISO   | ISO 3309              | 0x000000000000001B | $x^{64}+x^4+x^3+x+1$                                                                                                                                                                                                         |

### 位宽 Bit Width

> Number of bits of CRC check result. Supports 8-bit, 16-bit, 32-bit, and 64-bit.

位宽表示校验结果的位数，例如CRC-8、CRC-16、CRC-32、CRC-64，分别表示校验结果位的位数为：8、16、32、64。

### 多项式编码 Polynomial Formula(HEX)

> The abbreviation of the generated formula, expressed in hexadecimal. Ignore the highest "1".

生成的编码通常是16进制，由于bit限制，需要忽略最高位的1。例如：

CRC-3的多项式$x^3+x+1$，对应二进制为`1011`，但是CRC-3只有3位校验位，则忽略最高位的1，所以对应16进制编码则表示为`0x3`

CRC-8同理：多项式为$x^8+x^2+x+1$，对应二进制为 `100000111`，但是只有8为校验位，所以忽略最高位的1，对应16进制编码为`0x7`

- CRC-64-ECMA-182: `0x42F0E1EBA9EA3693`

## 其他处理

有一些标准中会定义一些额外的计算，例如反向处理或位反转、结果反转、生成多项式反转等。

### 输入反转 Reflect In

在进行CRC计算之前，对输入数据的**每个字节**进行反转。

### 初始值 Initial Value

定义校验位的初始值，这样在计算的时候就不是在`message`后补零了，而是用初始值去填充。

通常没有特别说明的都是直接补零。

### 结果异或 XOR Out

在CRC计算结束后，一些标准规定要对最终的CRC值与指定的值进行异或操作。

通常在没有特别说明的情况下，是结果与 0xFFFFFFFF 进行异或。

### 字节顺序 Byte Order

定义是以大端字节序（big-endian）还是小端字节序（little-endian）处理输入数据。、

举个例子： 例如存在某个字节编码`AB12CD`

如果规范定义的是大端字节序，则会转化为`CDAB12`；

如果小端字节序，则会转化为`12ABCD`；

我认为字节顺序的定义一般是硬件传输层面的被动结果，而不是CRC计算上的主动处理。
