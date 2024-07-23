import { z } from "zod";

const NumberStringSchema = z
  .string()
  .refine((val) => !isNaN(Number(val.replace(",", "."))), {
    message: "Input must be a valid number string",
  });

export const TransferSchema = z.object({
  amount: NumberStringSchema,
  transferToId: z.number(),
});

export type TransferType = z.infer<typeof TransferSchema>;
