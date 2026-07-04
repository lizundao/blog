#!/usr/bin/env node
/**
 * 从 Pixabay 搜索并下载配图。
 *
 * 用法：
 *   node scripts/download-pixabay-image.mjs "writing notebook" public/images/essays/de-ai-flavor.jpg
 */

import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { assertPixabayConfig, pixabayConfig } from './pixabay.config.mjs';
import { projectRoot } from './lib/load-env.mjs';

const [query, outputArg] = process.argv.slice(2);

if (!query || !outputArg) {
  console.error('用法: node scripts/download-pixabay-image.mjs "<搜索词>" <输出路径>');
  process.exit(1);
}

const outputPath = resolve(projectRoot, outputArg);

async function searchPixabay(searchQuery) {
  const params = new URLSearchParams({
    key: pixabayConfig.apiKey,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '10',
  });

  const response = await fetch(`https://pixabay.com/api/?${params}`);
  if (!response.ok) {
    throw new Error(`Pixabay API 错误 ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  if (!data.hits?.length) {
    throw new Error(`Pixabay 未找到与「${searchQuery}」相关的图片`);
  }

  return data.hits[0];
}

async function downloadImage(url, filePath) {
  await mkdir(dirname(filePath), { recursive: true });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`下载失败 ${response.status}: ${url}`);
  }

  await pipeline(response.body, createWriteStream(filePath));
}

async function main() {
  assertPixabayConfig();

  const hit = await searchPixabay(query);
  const imageUrl = hit.largeImageURL || hit.webformatURL;

  await downloadImage(imageUrl, outputPath);

  console.log(`已保存: ${outputPath}`);
  console.log(`来源: Pixabay #${hit.id} · ${hit.pageURL}`);
  console.log(`作者: ${hit.user}`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
