# 守遵寻道

个人博客，基于 Astro 构建，部署于 Cloudflare Pages。

- 站点：<https://lizundao.com>
- 仓库：<https://github.com/lizundao/blog>

## 技术栈

- [Astro](https://astro.build/) 5（静态站点）
- Tailwind CSS + shadcn 风格组件
- React（仅主题切换等少量交互岛）
- Content Collections（Markdown 文章）
- Cloudflare Pages 部署

## 本地开发

```bash
npm install
npm run dev
```

访问 <http://localhost:4321>

## 构建与预览

```bash
npm run build
npm run preview   # 构建后预览 dist/（先 npm run build）
```

## 文章分类

| 分类 | 说明 | 路径 |
|------|------|------|
| 随笔 | 日常写作、念头杂记 | `/essay` |
| 造物 | 站点与工具介绍 | `/works` |

新建文章时在 frontmatter 中设置：

```yaml
---
title: "标题"
description: "摘要"
pubDate: 2026-06-12
tags: ["标签"]
cover: "/images/cover.png"  # 可选，列表封面
featured: false   # 可选，首页造物区优先展示
---
```

## 部署（Cloudflare Pages）

连接 GitHub 仓库后，使用以下构建配置：

| 配置项 | 值 |
|--------|-----|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22` |

无需安装 `@astrojs/cloudflare`，项目为纯静态输出（`output: 'static'`）。

## 目录结构

```
src/
├── assets/          # 图片资源（logo、头像）
├── components/      # Astro / React 组件
├── content/essay/   # 随笔
├── content/work/    # 造物
├── layouts/         # 页面布局
├── pages/           # 路由
├── config/site.ts   # 站点与作者信息
└── styles/          # 全局样式
public/
├── images/          # 静态图片（封面、站点截图）
└── _headers         # Cloudflare 缓存与安全头
```

## 相关作品

- [墨点](https://inkdot.cn/) — 桌面效率工具
- [亲戚百科](https://qinqi.wiki/) — 亲戚称呼计算器
- [Towalles](https://towalles.com/cn) — 在线工具集
- [全球时钟](https://world-clock.app/) — 世界时间

## License

Private. All rights reserved.
