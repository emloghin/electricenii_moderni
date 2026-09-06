import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['clasic', 'smart']),
    summary: z.string(),
    icon: z.string().optional(),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      location: z.string(),
      year: z.number(),
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      order: z.number().default(0),
      video: z.string().optional(),
      videoTitle: z.string().optional(),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    location: z.string(),
    role: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    order: z.number(),
  }),
});

export const collections = { services, projects, testimonials };
