#!/usr/bin/env node
/**
 * 使用硅基流动等 OpenAI 兼容 API 润色随笔，去除 AI 腔。
 *
 * 用法：
 *   npm run essay:polish                          # 润色全部随笔（预览，不写回）
 *   npm run essay:polish -- src/content/essay/xxx.md
 *   npm run essay:polish -- --write               # 写回全部（先备份 .bak）
 *   npm run essay:polish -- src/content/essay/xxx.md --write
 */

import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import {
  articleAiConfig,
  assertArticleAiConfig,
  polishSystemPrompt,
} from './article-ai.config.mjs';
import { projectRoot } from './lib/load-env.mjs';

const essayDir = join(projectRoot, 'src/content/essay');
const args = process.argv.slice(2).filter((arg) => arg !== '--');
const shouldWrite = args.includes('--write');
const fileArgs = args.filter((arg) => !arg.startsWith('--'));

function resolveEssayFiles() {
  if (fileArgs.length > 0) {
    return fileArgs.map((file) => resolve(projectRoot, file));
  }
  return readdirSync(essayDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => join(essayDir, name));
}

async function callArticleAi(content) {
  const response = await fetch(`${articleAiConfig.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${articleAiConfig.apiKey}`,
    },
    body: JSON.stringify({
      model: articleAiConfig.model,
      temperature: articleAiConfig.temperature,
      max_tokens: articleAiConfig.maxTokens,
      messages: [
        { role: 'system', content: polishSystemPrompt },
        {
          role: 'user',
          content: `请润色以下随笔，去除 AI 味道，保持作者口吻：\n\n${content}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`AI API 错误 ${response.status}: ${detail}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error('AI 返回为空');
  }

  return text.replace(/^```(?:markdown|md)?\n?/i, '').replace(/\n?```$/i, '').trim();
}

async function polishFile(filePath) {
  const original = readFileSync(filePath, 'utf8');
  console.log(`\n润色：${basename(filePath)}`);

  const polished = await callArticleAi(original);

  if (shouldWrite) {
    copyFileSync(filePath, `${filePath}.bak`);
    writeFileSync(filePath, `${polished}\n`, 'utf8');
    console.log(`已写回：${filePath}（备份：${filePath}.bak）`);
  } else {
    console.log('--- 预览（未写回，加 --write 才会保存）---\n');
    console.log(polished);
  }
}

async function main() {
  assertArticleAiConfig();

  const files = resolveEssayFiles();
  if (files.length === 0) {
    console.error('未找到要润色的 markdown 文件');
    process.exit(1);
  }

  for (const file of files) {
    await polishFile(file);
  }

  if (!shouldWrite) {
    console.log('\n提示：当前为预览模式。确认无误后加 --write 写回文件。');
  }
}

main().catch((error) => {
  const detail = error.cause?.message ?? error.message ?? String(error);
  console.error(detail);
  process.exit(1);
});
