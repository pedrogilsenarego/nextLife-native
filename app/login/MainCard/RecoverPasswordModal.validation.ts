import { z } from "zod";

export const RecoverEmailSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(1, {
      message: "The email is required",
    }),
});

export type RecoverEmailType = z.infer<typeof RecoverEmailSchema>;
