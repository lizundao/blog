import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import defaultOgImage from '@/assets/images/logo.jpg';

type SiteUrl = URL | string;

/**
 * 生成可用于 og:image 的绝对 URL。
 * - ImageMetadata（astro:assets）→ getImage 生成构建产物地址
 * - 字符串：http(s) 直接用；/path 形式按站点域名拼绝对地址
 * - 空值 → 回退到站点默认分享图
 */
export async function resolveOgImage(
  image: ImageMetadata | string | undefined | null,
  siteUrl: SiteUrl,
): Promise<string> {
  let href: string;

  if (!image) {
    href = (await getImage({ src: defaultOgImage, width: 1200 })).src;
  } else if (typeof image === 'string') {
    href = image;
  } else {
    href = (await getImage({ src: image, width: 1200 })).src;
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  return new URL(href, siteUrl).href;
}
