import { site } from '@/config/site';

type SiteUrl = URL | string;

export function resolveOgImage(image: string | undefined, siteUrl: SiteUrl): string {
  const path = image ?? site.defaultOgImage;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return new URL(path, siteUrl).href;
}
