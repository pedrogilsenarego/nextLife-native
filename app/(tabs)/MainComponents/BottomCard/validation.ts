import { z } from "zod";

// Custom Zod schema for a string representing a number with comma conversion
const NumberStringSchema = z
  .string()
  .refine((val) => !isNaN(Number(val.replace(",", "."))), {
    message: "Input must be a valid number string",
  });

export const NewEntrySchema = z.object({
  amount: NumberStringSchema,
  note: z.string().optional(),
});

export type NewEntryType = z.infer<typeof NewEntrySchema>;
