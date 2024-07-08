import { z } from "zod";

// Custom Zod schema for a string representing a number with comma conversion

export const NewBusinessSchema = z.object({
  iconType: z.number(),
  businessName: z.string().max(20).min(3),
  type: z.number(),
});

export type NewBusinessType = z.infer<typeof NewBusinessSchema>;
