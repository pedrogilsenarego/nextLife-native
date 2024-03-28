import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(1, {
      message: "The email is required",
    }),
  password: z
    .string({
      required_error: "The password is required",
    })
    .min(
      3,

      "The password is to short"
    ),
});

export type LoginType = z.infer<typeof LoginSchema>;
