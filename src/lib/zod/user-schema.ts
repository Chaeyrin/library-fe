import { z } from "zod";

/** users
 * /create */
export const profileFormSchema = z
  .object({
    full_name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 255 characters.",
      }),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    address: z.string().max(160).optional(),
    role: z.string({
      required_error: "Please select an role account to display.",
    }),
    confPassword: z.string().min(2, {
      message: "Confirm password required.",
    }),
  })
  .refine((data) => data.password === data.confPassword, {
    path: ["confPassword"],
    message: "Password do not match",
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

/** users
 * /update */
export const updateUserFormSchema = z.object({
  full_name: z.string().min(1, "Title is required."),
  username: z.string().min(1, "Author is required."),
  email: z.string().min(1, "Publisher is required."),
  address: z.string().min(1, "Stock is required."),
});

export type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>;
