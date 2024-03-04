/* eslint-disable @next/next/no-img-element */
import { useUpdateBook } from "@/app/api/services/book/mutation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BookFormValues, bookFormSchema } from "@/lib/zod/book-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Replace, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function BookUpdateForm({
  bookData,
  bookId,
  userRole,
  categoryData,
  categoryById,
}: any) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const updateBookMutation = useUpdateBook();

  const defaultValues: Partial<BookFormValues> = {
    book_tittle: bookData?.book_tittle,
    author: bookData?.author,
    publisher: bookData?.publisher,
    year_published: new Date(bookData?.year_published),
    stock: bookData?.book_stock?.quantity_available?.toString(),
    category: (categoryById || [])
      .map((category: any) => category.categoryId?.toString())
      .filter((value: any) => value !== undefined && value !== "")
      .map((value: any) => ({ value: value as string })),
  };

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  const onSubmit = (values: BookFormValues) => {
    updateBookMutation.mutate({ ...values, id: bookId });
  };

  const { fields, append, remove } = useFieldArray({
    name: "category",
    control: form.control,
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex">
          <div className="flex-1 mr-8">
            {selectedFile && preview ? (
              <div className="relative min-h-[50vh] md:min-h-screen max-h-screen border rounded-lg">
                <div className="absolute bottom-3 right-3 z-10">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full text-xs [&_svg]:h-5 [&_svg]:w-5 font-medium text-center py-2 px-3 cursor-pointer flex items-center gap-2">
                          <Replace />
                          Change image
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="hidden"
                            accept="image/*"
                            // name="image"
                            type="file"
                            disabled={form.formState.isSubmitting}
                            onChange={onSelectFile}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Image
                  src={preview}
                  alt="test"
                  fill={true}
                  quality={10}
                  className="object-contain"
                />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <div className="flex flex-col">
                      <img
                        id="imagePreview"
                        className={cn(
                          "h-auto w-auto object-cover rounded-xl",
                          "aspect-[1/1]"
                        )}
                        alt="Book Preview"
                        src={bookData?.url}
                      />
                      <div className="flex mt-4">
                        <FormControl>
                          <Input
                            {...rest}
                            accept="image/*"
                            name="data_image"
                            type="file"
                            disabled
                            onChange={onSelectFile}
                          />
                        </FormControl>
                        {/* <FormLabel className="ml-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-medium text-center py-1 px-3 cursor-pointer">
                          <UploadIcon />
                        </FormLabel> */}
                      </div>
                    </div>
                    <FormDescription>
                      Sorry, we can&apos;t update the cover book at this time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="flex-1 border p-6 rounded-lg">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="book_tittle"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Title Book</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Title of book"
                        readOnly={userRole === "user"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Author of book"
                        readOnly={userRole === "user"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publisher</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Publisher of book"
                        readOnly={userRole === "user"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year_published"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Year Published</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            disabled={userRole === "user"}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick date of book published</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Author of book"
                        readOnly={userRole === "user"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {["admin", "officer"].includes(userRole) && (
                <div>
                  {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`category.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            Category Book
                          </FormLabel>
                          <FormDescription
                            className={cn(index !== 0 && "sr-only")}
                          >
                            Add categories for this book
                          </FormDescription>
                          <div className="flex space-x-4">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a verified email to display" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoryData?.map((category: any) => (
                                  <SelectItem
                                    key={category.id}
                                    value={
                                      category.id !== undefined
                                        ? category.id.toString()
                                        : ""
                                    }
                                  >
                                    {category.category_title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                              {index > 0 && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  ✖
                                </Button>
                              )}
                            </Select>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ value: "" })}
                  >
                    Add Category
                  </Button>
                </div>
              )}
            </div>
            <Button
              className="w-full mt-6"
              type="submit"
              disabled={
                (userRole !== "admin" && userRole !== "officer") ||
                updateBookMutation.isPending
              }
            >
              {updateBookMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Update detail book data"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
