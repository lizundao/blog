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

/** 随笔润色系统提示词（legacy，优先读 essay-human-zh skill） */
export const polishSystemPrompt = `你是一位中文随笔编辑。请严格遵循项目内 .agents/skills/essay-human-zh/SKILL.md 的全部规则。

作者风格：真诚、克制，像熟人聊天；先事后人；句子长短错落；至少 3 个具体锚点；禁止编号列表堆砌、排比升华、「写在后面」式结尾。

输出：只输出完整 Markdown（含 frontmatter），不要解释。不改 pubDate、cover 路径。`;

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
