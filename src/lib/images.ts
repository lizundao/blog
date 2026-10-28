import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true },
);

/**
 * 把 frontmatter 里的 /images/... 路径解析成 astro:assets 的 ImageMetadata。
 * 图片已从 public/images 迁到 src/assets/images，路径规则一一对应。
 */
export function resolveImage(src?: string | null): ImageMetadata | undefined {
  if (!src) return undefined;
  const key = `/src/assets/images${src.replace(/^\/images/, '')}`;
  return modules[key]?.default;
}
