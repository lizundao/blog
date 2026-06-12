import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type PostCategory = 'essay' | 'work';

export const POST_CATEGORIES = {
  essay: {
    label: '随笔',
    description: '路上的念头、技术与生活的杂记。',
    path: '/blog',
  },
  work: {
    label: '造物',
    description: '路上所作，站点与小工具的缘起与介绍。',
    path: '/works',
  },
} as const;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.category === category);
}

export function getCategoryLabel(category: PostCategory): string {
  return POST_CATEGORIES[category].label;
}

export function getPostSlug(post: Post): string {
  return post.id.replace(/\.(md|mdx)$/, '');
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
