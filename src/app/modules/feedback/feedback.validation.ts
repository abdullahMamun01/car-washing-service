import { z } from 'zod';

// Zod validation schema for feedback
const feedbackSchema = z.object({
  body: z.object({
    ratings: z
      .number()
      .min(1, { message: 'Rating must be at least 1' })
      .max(5, { message: 'Rating cannot be more than 5' }),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .trim(),
  }),
});

export default feedbackSchema;
