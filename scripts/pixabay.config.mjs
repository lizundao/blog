import { loadEnv } from './lib/load-env.mjs';

loadEnv();

/** @type {import('./pixabay.config.mjs').PixabayConfig} */
export const pixabayConfig = {
  apiKey: process.env.PIXABAY_API_KEY ?? '',
};

export function assertPixabayConfig() {
  if (!pixabayConfig.apiKey) {
    throw new Error(
      '未配置 PIXABAY_API_KEY。请在 .env 中填入 Pixabay API 密钥，参考 .env.example。',
    );
  }
}

/**
 * @typedef {Object} PixabayConfig
 * @property {string} apiKey
 */
