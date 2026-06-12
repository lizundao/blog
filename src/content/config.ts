import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

const essay = defineCollection({
  type: 'content',
  schema: postSchema,
});

const work = defineCollection({
  type: 'content',
  schema: postSchema,
});

export const collections = { essay, work };
