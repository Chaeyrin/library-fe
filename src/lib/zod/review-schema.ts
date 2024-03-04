import { z } from "zod";

export const reviewFormSchema = z.object({
  review_message: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "You need to select a notification type.",
  }),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
