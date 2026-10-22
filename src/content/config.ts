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

/** 幽明：志怪杂谈，比随笔多两个锚点——妖怪本名与古籍出处 */
const youmingSchema = postSchema.extend({
  beast: z.string().optional(),
  source: z.string().optional(),
});

const youming = defineCollection({
  type: 'content',
  schema: youmingSchema,
});

export const collections = { essay, work, youming };
