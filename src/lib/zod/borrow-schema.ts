import { z } from "zod";

export const applyBorrowFormSchema = z.object({
  quantity_borrowed: z.string({
    required_error: "Please submit quantity book for borrowed",
  }),
});

export type ApplyBorrowFormValues = z.infer<typeof applyBorrowFormSchema>;
