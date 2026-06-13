# Taste Skill 设计审计 · 改动清单

> 审计日期：2026-06-12  
> Design Read：中文 editorial 博客，书卷气 / 沉静，preserve 现有品牌。

## 第一阶段（已完成）

- [x] RSS 标题、PostCard alt、BlogLayout slug 路径
- [x] 首页随笔 editorial 列表布局
- [x] 列表页去掉 `ls` terminal
- [x] About 减 eyebrow、作者 role 中文化
- [x] Hero 移动端字号、OG 基础 meta、局部 `motion-reduce`

## 第二阶段（已完成）

- [x] 移除文章页 `cat`、Footer `$ echo`，Hero `~/static` 改为「随笔 · 造物 · 关于」
- [x] Hero 移动端：logo 区 sm 以上才显示、作者条 sm 以上才显示、间距收紧
- [x] 文章级 OG：`og:image` 用 cover，`og:type=article`，`article:published_time`
- [x] 默认分享图 `site.defaultOgImage` → `/images/logo.jpg`
- [x] favicon 修正为 `/favicon.svg`
- [x] 全站 `prefers-reduced-motion` 全局减弱动画
- [x] 文章页 JSON-LD 结构化数据
- [x] About / AuthorCard 去除宽 tracking eyebrow

## 第三阶段（已完成）

- [x] `/404` 改为 editorial 语气，去除 terminal，补充返回首页 / 随笔 / 造物入口
- [x] `/works` 列表改为 2 列网格（4 项造物 2×2，避免宽屏四列过散）

## 全站路由审计覆盖

| 路由 | 状态 |
|------|------|
| `/` | 已审计 |
| `/essay`、`/essay/*` | 已审计 |
| `/works`、`/works/*` | 已审计 |
| `/about` | 已审计 |
| `/404` | 已审计 |
| `/rss.xml` | meta 已修正 |

## 暂缓 / 不做

- Lucide 换 Phosphor（项目已依赖，维持现状）
- 造物区卡片网格（适合站点截图展示，保留）
