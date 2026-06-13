import rss from '@astrojs/rss';
import { getPostUrl, getPublishedPosts } from '@/lib/posts';
import { site } from '@/config/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: getPostUrl(post),
    })),
  });
}
