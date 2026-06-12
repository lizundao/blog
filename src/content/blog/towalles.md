---
title: "Towalles：150 个在线工具，打开即用"
description: "介绍我做的在线工具站 Towalles，为全球创作者与工程师打造的隐私优先工具集。"
pubDate: 2026-06-11
tags: ["Towalles", "产品", "Web"]
category: work
cover: "/images/sites/towalles.png"
featured: true
---

[墨点](https://inkdot.cn/) 做桌面小工具，[亲戚百科](https://qinqi.wiki/) 搞清称呼与亲缘，还有一个站专门收拢**在线工具**：[Towalles](https://towalles.com/cn)。

中文入口是 [towalles.com/cn](https://towalles.com/cn)。一句话介绍：**为全球创作者与工程师打造的专业在线工具集，隐私优先，无需注册**。打开网页就能用，不算账、不登录，尽量在浏览器里把事情办完。

![Towalles towalles.com/cn 首页截图](/images/sites/towalles.png)

## 为什么要做 Towalles

开发、写作、运维、做内容，日常总有些零碎需求：格式化 JSON、估一下 Token、编解码 Base64、查个子网、生成个 UUID、对比两段文本……

每次为此单独装一个 App，或把数据丢给不知名的在线服务，都不划算。前者占地方，后者担隐私。

Towalles 想把这些高频场景收成一处：**工具够全，入口够近，计算尽量在本地完成。**

## 站点概况

截至写这篇文章时，站上共有 **150 个工具**，分 **10 个大类**：

| 分类 | 方向 |
|------|------|
| AI 工具 | Token 估算、Prompt 组装、上下文检查、JSON 提取与校验等 |
| 加密解密 | 哈希、HMAC、JWT 解码、AES 加解密、密码强度分析等 |
| 转换工具 | 进制、Base64、颜色、YAML/JSON/XML、日期时间等 |
| 网页工具 | URL 编解码、HTML 实体、Open Graph、WCAG 对比度等 |
| 图片与视频 | 二维码、压缩裁剪、格式转换、调色板提取等 |
| 开发工具 | JSON/SQL 格式化、正则测试、Docker Compose 转换等 |
| 网络工具 | IPv4/IPv6 子网、MAC 地址、CIDR 聚合、ACL 生成等 |
| 数学工具 | 计算器、单位换算、统计、三角函数等 |
| 测量工具 | 计时器、温度/长度/重量换算、世界时钟等 |
| 文本工具 | Lorem 生成、文本统计、Diff 对比、可读性评分等 |

支持搜索、最近使用、收藏夹，常用工具下次能更快找到。

## 几个典型场景

**写 Prompt 或对接大模型**：用 Token 估算器粗算长度，用上下文窗口检查看是否超限，用 LLM 费用计算器按参考价目估个成本，用 Prompt Diff 对比两版改动。

**日常开发**：JSON 格式化与比较、正则测试、Crontab 生成、CHMOD 计算、`.env` 对比，都能在页内完成。

**安全与运维**：哈希与 HMAC 生成、JWT 解码、子网划分、IPv6 ULA 生成，不必把敏感数据发到第三方。

**内容与发布**：Slug 生成、Meta 长度检查、二维码与 Favicon 生成、Markdown 转 HTML，适合写文章、做落地页时顺手一用。

具体工具会持续增补，原则是：**能本地算的不上云，能一步完成的不绕路。**

## 和墨点、亲戚百科的关系

三个站分工不同，气质相近：

- **墨点**：桌面端，离线、本地文件处理
- **亲戚百科**：垂直场景，称呼与亲缘
- **Towalles**：浏览器端，广谱在线工具

都是「有用、少打扰、尽量尊重隐私」这一路子上的作品。

## 去试试

如果你常在网上找小工具，又不想注册、不想上传文件，可以收藏：

**[https://towalles.com/cn](https://towalles.com/cn)**

有缺的功能或发现 bug，站上有联系与反馈入口，欢迎告诉我。

---

Towalles 仍在迭代，工具数与分类会变，这篇介绍也会随后更新。
