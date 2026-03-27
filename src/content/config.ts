import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

export const collections = {
  articles: defineCollection({
	type: 'content',
	schema: z.object({
	  title: z.string(),
	  date:  z.date(),
	  description: z.string(),
	}),
  }),
};
