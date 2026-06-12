import rss from '@astrojs/rss';
import { getPostSlug, getPublishedPosts } from '@/lib/posts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'My Blog',
    description: '个人博客 RSS 订阅',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${getPostSlug(post)}/`,
    })),
  });
}
