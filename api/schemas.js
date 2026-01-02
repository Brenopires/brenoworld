import { z } from 'zod';

// Trip validation schema
export const tripSchema = z.object({
  country: z.string().min(1, 'Country is required').max(100),
  display_name: z.string().min(1, 'Display name is required').max(100),
  month: z.string().max(10).optional(),
  year: z.number().int().min(1900).max(2100),
  description: z.string().max(500).optional().or(z.literal(''))
});

// Post validation schema
export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  summary: z.string().max(500).optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['article', 'thought'])
});

// Media validation schema
export const mediaSchema = z.object({
  type: z.enum(['image', 'video']),
  url: z.string().url('Must be a valid URL'),
  title: z.string().max(200).optional().or(z.literal('')),
  description: z.string().max(500).optional().or(z.literal(''))
});

// Tool validation schema
export const toolSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  category: z.string().min(1, 'Category is required').max(100),
  description: z.string().max(500).optional().or(z.literal(''))
});

// Playbook validation schema
export const playbookSchema = z.object({
  id: z.string().min(1, 'ID is required').max(100).regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1, 'Title is required').max(200),
  category: z.string().min(1, 'Category is required').max(100),
  summary: z.string().max(500).optional().or(z.literal('')),
  steps: z.array(z.any()).optional().default([]),
  details: z.string().optional().or(z.literal(''))
});

// Case study validation schema
export const caseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  summary: z.string().max(500).optional().or(z.literal('')),
  result: z.string().max(500).optional().or(z.literal('')),
  lessons: z.array(z.any()).optional().default([])
});
