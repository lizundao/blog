---
title: "给 ResAPI 接上 MCP：上午写出路，下午把路接上"
description: "早上还在想底层开发者要不要做 MCP，下午 ResAPI 的 /mcp 就上线了。不是做大中台，是把已有查询能力交给 Agent 调用。"
pubDate: 2026-07-04
tags: ["随笔", "AI", "工作"]
cover: "/images/essays/resapi-mcp.jpg"
featured: false
---

![连接与通路](/images/essays/resapi-mcp.jpg)

早上刚写完一篇随笔，谈豆包下线智能体、腾讯推 WorkBuddy、大厂抢 AI 入口。文末我说，底层开发者也许该从等流量转向接能力——把服务做成 Agent 能调的 MCP，从门面变成厨房。

话是上午说的。下午 ResAPI 的 MCP 就上线了：`https://www.resapi.cn/mcp`，12 个 Tool，Cursor 填个 URL 就能用。

有点快，但不偶然。ResAPI 本来就是只读查询 API，节假日、区划、邮编、身份证校验，这些能力 Agent 恰恰常需要。REST 给人和脚本用，MCP 给 Agent 用，底层是同一份数据和逻辑。

## 不另起炉灶

很多人一听 MCP，以为要新建一个 AI 中台项目。我这次的做法正好相反：不重复造数据，只在 ResAPI 上加一层 Agent 入口。

远程 Streamable HTTP，客户端不用装二进制；需要的话还有本地 stdio 的 `resapi-mcp`，指向同一个 API 根地址。Tool 做成粗粒度——`holidays_check`、`regions_search`、`validate_idcard`——不是把 60 多个原始端点全扔给模型，而是帮 AI 少猜、少调错。

文档写在 [MCP 接入说明](https://www.resapi.cn/docs/agent/mcp) 里：怎么配 Cursor、怎么验证 initialize、WorkBuddy 怎么接。`/agent.json` 里也有工具清单和 `when_to_use` 提示。

让自己的厨房多开一扇供 Agent 进出的门，就够了。

## 和早上那篇

早上我写：用户可能不到你的网站，但能力可以在别人的入口里被用到。下午做的事，就是这句话的一次落地。

我不指望 ResAPI 因此流量暴涨。MCP 不会凭空带来用户；该限流还限流，该维护数据还维护数据。但多一条通路，多一种存在方式——当有人在 Cursor 里问「2026 年国庆放几天」，或在 WorkBuddy 里让 Agent 校验身份证，背后可能是 ResAPI 在应答。用户依然不会记住 resapi.cn，但能力被用到了，这比首页多几个 UV 更实在。

这也是我对底层数据提供者不那么悲观的原因。你可以没有最大的门面，但可以在关键查询上做到准、稳、文档清楚、Agent 一调就懂。

## 小步就好

这次上线我刻意控制范围：12 个 Tool，覆盖最高频场景；不做编排，不做写操作；远程 MCP 优先，配置越短越好。先跑通 Cursor，再试 WorkBuddy，看哪个 Tool 被调得多、哪个参数 AI 老搞错，再改。

若三个月几乎没人用，损失也有限——主要是文档和一层 HTTP 适配。若某个 Tool 被频繁调用，再考虑聚合接口、配额、企业版。先证明被需要，再谈做平台。

网站是你的地，MCP 是你的窗。地要留——规则、品牌、文档、信任，还得在自己域名下。窗要开——Agent 时代，能力得接出去。

ResAPI 造物文我更新了 MCP 一节；这篇随笔，把为什么做和怎么做分开写清楚。想法和行动差了一个下午，这种差距不算大，正合适。

---
