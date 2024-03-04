import { useDeleteBook } from "@/app/api/services/book/mutation";
import { useApplyBorrow } from "@/app/api/services/borrow/mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import {
  ApplyBorrowFormValues,
  applyBorrowFormSchema,
} from "@/lib/zod/borrow-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default function BookButtonOption({
  bookData,
  bookId,
  sessionId,
  sessionRole,
  status,
  statusIsLoading,
  statusIsPending,
}: any) {
  const router = useRouter();
  const onlyOfficerAdmin = sessionRole === "admin" || sessionRole === "officer";

  const applyBorrowMutation = useApplyBorrow();

  const deleteBookMutation = useDeleteBook();

  const form = useForm<ApplyBorrowFormValues>({
    resolver: zodResolver(applyBorrowFormSchema),
  });

  const handleApply = async (values: ApplyBorrowFormValues) => {
    await applyBorrowMutation.mutateAsync({
      ...values,
      bookId,
      userId: sessionId,
    });
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBookMutation.mutateAsync(id);
      router.push("/books");
    } catch (error: any) {
      console.log("error", error);
      if (deleteBookMutation.isError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error occurred while deleting the book",
        });
      }
    }
  };

  if (statusIsLoading) {
    return (
      <div className="flex space-x-4 justify-end">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex space-x-4 justify-end">
      {sessionRole === "user" && (
        <>
          {["completed", "rejected", false].includes(
            status.borrowing_status
          ) && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {statusIsPending ? (
                  "loading..."
                ) : (
                  <Button variant="secondary" disabled={statusIsPending}>
                    Would like to borrow this book ? 👋
                  </Button>
                )}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Apply to borrow this book</AlertDialogTitle>
                  <AlertDialogDescription>
                    Submit this book borrow request to the admin
                  </AlertDialogDescription>
                  <div className="grid gap-2 py-2">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleApply)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="quantity_borrowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormDescription>
                                how many books do you want to borrow?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex space-x-4">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction type="submit">
                            Apply
                          </AlertDialogAction>
                        </div>
                      </form>
                    </Form>
                  </div>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {status.borrowing_status === "pending" && (
            <Button variant="secondary">Status Borrow: Pending 📩</Button>
          )}
          {status.borrowing_status === "borrowed" && (
            <Button variant="secondary">Status Borrow: Borrowed ⏳</Button>
          )}
          {status.borrowing_status === "returning" && (
            <Button variant="secondary">Status Borrow: Returning ✅</Button>
          )}
          {["pending", "borrowed", "returning"].includes(
            status.borrowing_status
          ) && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  💡
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Suggested direction
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Go to the borrowing page to view the details of your
                      borrow data
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Link
                      href="/borrows"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Click here
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </>
      )}
      {onlyOfficerAdmin && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                book and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {bookData && bookData.id && (
                <AlertDialogAction
                  onClick={() => handleDeleteBook(bookData.id!)}
                >
                  Continue
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
