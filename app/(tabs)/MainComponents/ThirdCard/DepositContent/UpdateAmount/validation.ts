import { z } from "zod";

const NumberStringSchema = z
  .string()
  .refine((val) => !isNaN(Number(val.replace(",", "."))), {
    message: "Input must be a valid number string",
  });

export const UpdateSchema = z.object({
  amount: NumberStringSchema,
});

export type UpdateType = z.infer<typeof UpdateSchema>;
