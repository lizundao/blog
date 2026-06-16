import { loadEnv } from './lib/load-env.mjs';

loadEnv();

function readNumber(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  return Number.isFinite(value) ? value : fallback;
}

function readString(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (value !== undefined && value !== '') return value;
  }
  return '';
}

function normalizeBaseUrl(url) {
  const fixed = url
    .trim()
    .replace(/^h+ttps:\/\//i, 'https://')
    .replace(/\/$/, '');

  if (!/^https?:\/\//i.test(fixed)) {
    throw new Error(`API 地址格式不正确：${url}`);
  }

  return fixed;
}

/** @type {import('./article-ai.config.mjs').ArticleAiConfig} */
export const articleAiConfig = {
  apiKey: readString('ARTICLE_AI_API_KEY', 'DEEPSEEK_API_KEY'),
  baseUrl: normalizeBaseUrl(
    readString('ARTICLE_AI_BASE_URL', 'DEEPSEEK_API_BASE') || 'https://api.siliconflow.cn/v1',
  ),
  model: readString('ARTICLE_AI_MODEL', 'DEEPSEEK_MODEL') || 'deepseek-ai/DeepSeek-V3',
  temperature: readNumber('ARTICLE_AI_TEMPERATURE', readNumber('DEEPSEEK_TEMPERATURE', 0.7)),
  maxTokens: readNumber('ARTICLE_AI_MAX_TOKENS', readNumber('DEEPSEEK_MAX_TOKENS', 4096)),
};

/** 随笔润色系统提示词 */
export const polishSystemPrompt = `你是一位中文随笔编辑，帮作者润色博客文章。

作者风格参考：
- 真诚、克制，像熟人聊天，不像公关稿或 AI 教程
- 句子长短错落，少用对称排比和「不是……而是……」
- 少用加粗、列表堆砌、空洞升华和「愿我们……」式结尾
- 保留技术细节与事实，不编造
- 保留 Markdown 正文结构；frontmatter 的 title、description、pubDate、tags、cover、featured 可微调措辞，但不要改日期和路径

输出要求：
- 只输出完整 Markdown 文件（含 frontmatter），不要解释
- 去除 AI 腔：套路比喻、过度总结、说教感、排比句、金句收尾`;

export function assertArticleAiConfig() {
  if (!articleAiConfig.apiKey || articleAiConfig.apiKey === 'sk-your-key-here') {
    throw new Error(
      '未配置 ARTICLE_AI_API_KEY。请执行：cp .env.example .env ，然后填入硅基流动 API 密钥。',
    );
  }
}

/**
 * @typedef {Object} ArticleAiConfig
 * @property {string} apiKey
 * @property {string} baseUrl
 * @property {string} model
 * @property {number} temperature
 * @property {number} maxTokens
 */
