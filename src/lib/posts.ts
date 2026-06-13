import { getCollection, type CollectionEntry } from 'astro:content';

export type PostCategory = 'essay' | 'work';
export type Post = CollectionEntry<PostCategory>;

export const POST_CATEGORIES = {
  essay: {
    label: '随笔',
    description: '路上的念头、技术与生活的杂记。',
    path: '/essay',
  },
  work: {
    label: '造物',
    description: '路上所作，站点与小工具的缘起与介绍。',
    path: '/works',
  },
} as const;

export function getPostCategory(post: Post): PostCategory {
  return post.collection;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const [essays, works] = await Promise.all([
    getCollection('essay', ({ data }) => !data.draft),
    getCollection('work', ({ data }) => !data.draft),
  ]);
  return [...essays, ...works].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  const posts = await getCollection(category, ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getCategoryLabel(category: PostCategory): string {
  return POST_CATEGORIES[category].label;
}

export function getPostSlug(post: Post): string {
  return post.id.replace(/\.(md|mdx)$/, '');
}

export function getPostUrl(post: Post): string {
  const slug = getPostSlug(post);
  return post.collection === 'essay' ? `/essay/${slug}/` : `/works/${slug}/`;
}


export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}
