---
title: "ResAPI：免费开放 API，复制即可对接"
description: "介绍 ResAPI（resapi.cn）：免费只读查询 API，覆盖节假日、区划、高校、邮编等；现已支持 MCP，Cursor 与 WorkBuddy 可直接调用。"
pubDate: 2026-06-16
updatedDate: 2026-07-04
tags: ["ResAPI", "产品", "Web"]
cover: "/images/sites/resapi.png"
featured: false
---

最近我又上线了一个站：[ResAPI](https://www.resapi.cn/)。

地址是 [resapi.cn](https://www.resapi.cn/)，定位很直接：**免费开放、只读查询、无需注册**。目标不是做大而全的平台，而是把开发里常见的查询能力整理成统一的 REST 接口，文档写清楚，复制示例就能接。

![ResAPI resapi.cn 首页截图](../../assets/images/sites/resapi.png)

## 为什么做 ResAPI

平时写产品或脚本，经常会遇到这些需求：查节假日、查行政区划、手机号段归属地、邮编地名互查、时区转换、证件编码校验……

这些能力单看不复杂，但真正对接时常常很碎：有的接口文档不全，有的字段风格不统一，有的要先注册再申请 key，验证成本不低。

ResAPI 想做的，是把这类**高频只读查询**集中起来，统一响应格式与错误码，尽量减少「为了一个小需求接三四个来源」的折腾。

## 现在有哪些能力

当前已上线 9 个 API 方向，包含：

- 地址标准化
- 高校基础信息
- 节假日判断（含公历农历互查、节气等）
- 省级非遗信息
- 手机号段归属地
- 全国行政区划
- 时区与时间格式转换
- 编码校验（如 USCC、身份证、银行卡号）
- 邮政编码查询

都是 `GET` 读取接口，偏向「拿来就查」而不是复杂业务流。

## Agent / MCP 接入

2026 年 7 月起，ResAPI 增加了 **MCP（Model Context Protocol）** 支持。同一套查询能力，除了 REST，还可以直接给 Cursor、Claude Desktop、WorkBuddy 等 Agent 客户端调用。

**远程 MCP 端点（推荐）：**

```
https://www.resapi.cn/mcp
```

无需下载二进制，配置 URL 即可。完整说明见 [MCP 接入文档](https://www.resapi.cn/docs/agent/mcp)。

Cursor 配置示例：

```json
{
  "mcpServers": {
    "resapi": {
      "url": "https://www.resapi.cn/mcp"
    }
  }
}
```

MCP 层暴露了 **12 个粗粒度 Tool**，便于 AI 准确选型，例如：

| Tool | 用途 |
|------|------|
| `holidays_check` | 某日是否放假、调休 |
| `regions_search` | 省市区搜索 |
| `phone_lookup` | 手机号/号段归属 |
| `validate_idcard` | 身份证校验 |
| `zipcode_lookup` | 邮编查地名 |
| `address_parse` | 自由文本地址解析 |

完整清单与参数说明见 [agent.json](https://www.resapi.cn/agent.json)。也提供本地 stdio 方式，适合 Claude Desktop 或自托管调试。

## 设计取舍

这个站我有意做了几条约束：

- **只做只读查询**：不接写入和托管，结果即查即返
- **尽量降低门槛**：无需注册 key，适合个人开发者和小团队快速接入
- **文档先行**：每个接口给参数说明、错误码与示例，MCP Tool 附带 `when_to_use` 提示

另外，区划、高校、邮编、非遗这类静态数据由本地维护并标注版本，方便后续追踪数据更新。

## 适用场景

- 给小程序、脚本、内部工具补基础查询能力
- 做表单校验、地址标准化与时间处理
- 在 Cursor / WorkBuddy 里让 Agent 直接查节假日、区划、邮编等结构化数据

如果你手里刚好有这类需求，可以试试：

**[https://www.resapi.cn/](https://www.resapi.cn/)**

MCP 文档：**[https://www.resapi.cn/docs/agent/mcp](https://www.resapi.cn/docs/agent/mcp)**

---

接口和 Agent 能力会继续补，新进展写在更新日志里。
