import { z } from "zod";

export const categoryFormSchema = z.object({
  category_title: z.string().min(2, {
    message: "Title is required.",
  }),
  category_description: z.string().min(2, {
    message: "Description is required.",
  }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
