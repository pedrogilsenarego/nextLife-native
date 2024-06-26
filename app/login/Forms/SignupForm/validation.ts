import { z } from "zod";

export const LoginSchema = z
  .object({
    username: z.string(),
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .min(1, {
        message: "The email is required",
      }),
    confirmPassword: z.string({
      required_error: "The validation password is required",
    }),

    password: z
      .string({
        required_error: "The password is required",
      })
      .min(
        3,

        "The password is to short"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginType = z.infer<typeof LoginSchema>;
