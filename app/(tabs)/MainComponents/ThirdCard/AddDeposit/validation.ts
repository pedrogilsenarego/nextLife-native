import { z } from "zod";

const NumberStringSchema = z
  .string()
  .refine((val) => !isNaN(Number(val.replace(",", "."))), {
    message: "Input must be a valid number string",
  })
  .optional();

export const NewDepositSchema = z.object({
  depositName: z.string().max(20).min(3),
  type: z.number(),

  amount: NumberStringSchema,
});

export type NewDepositType = z.infer<typeof NewDepositSchema>;
