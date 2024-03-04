"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "@/app/api/services/category/mutation";
import {
  CategoryFormValues,
  categoryFormSchema,
} from "@/lib/zod/category-schema";

export default function CreateCategoryForm() {
  const createCategoryMutation = useCreateCategory();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      await createCategoryMutation.mutateAsync(values);
      form.reset();
    } catch (error: any) {
      console.log("error catch", error);
    }
  };

  return (
    <div className="flex">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Add New Category</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Category Of Book</AlertDialogTitle>
            <AlertDialogDescription>
              Create new category here. Click create when you are done.
            </AlertDialogDescription>
            <div className="grid gap-2 py-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="category_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormDescription>
                          Title of Category Book.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormDescription>
                          Description of Category Book.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit">
                      {createCategoryMutation.isPending
                        ? "Please wait..."
                        : "Create"}
                    </AlertDialogAction>
                  </div>
                </form>
              </Form>
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
