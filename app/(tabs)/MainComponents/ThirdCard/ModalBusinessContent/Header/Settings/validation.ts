import { z } from "zod";

// Custom Zod schema for a string representing a number with comma conversion

export const DeleteBusinessSchema = z.object({
  confirm: z.literal("confirm"),
});

export type DeleteBusinessType = z.infer<typeof DeleteBusinessSchema>;
