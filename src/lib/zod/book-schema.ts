import { z } from "zod";

export const bookFormSchema = z.object({
  image: z.any({
    required_error: "A date of birth is required.",
  }),
  book_tittle: z.string().min(1, "Title is required."),
  author: z.string().min(1, "Author is required."),
  publisher: z.string().min(1, "Publisher is required."),
  year_published: z.date({
    required_error: "A date of birth is required.",
  }),
  stock: z.string().min(1, "Stock is required."),
  category: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;

// const createBookFormSchema = z.object({
//   // image: z.any(),
//   image: z.any(),
//   book_tittle: z.string().min(1, { message: "Title is required." }),
//   author: z.string().min(1, { message: "Author is required." }),
//   publisher: z.string().min(1, { message: "Publisher is required." }),
//   year_published: z.date({
//     required_error: "A date of birth is required.",
//   }),
//   stock: z.string().min(1, { message: "Stock is required." }),
//   category: z
//     .array(
//       z.object({
//         value: z.string(),
//       })
//     )
//     .optional(),
// });

// type BookFormValues = z.infer<typeof createBookFormSchema>;
