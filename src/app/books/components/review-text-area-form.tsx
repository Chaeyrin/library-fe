"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { reviewFormSchema, ReviewFormValues } from "@/lib/zod/review-schema";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  useCreateReview,
  useDeleteReview,
} from "@/app/api/services/review/mutation";
import { useUserReview } from "@/app/api/services/review/queries";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
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

export default function ReviewTextareaForm({
  bookId,
  userId,
  userReviewData,
}: any) {
  const createReviewMutation = useCreateReview();
  const deleteReview = useDeleteReview();

  console.log("data: ", userReviewData);

  const defaultValues: Partial<ReviewFormValues> = {
    review_message: userReviewData?.review_message,
    rating: userReviewData?.rating,
  };

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
  });

  const onSubmit = (data: ReviewFormValues) => {
    createReviewMutation.mutate({
      ...data,
      bookId,
      userId,
    });
  };

  const handleDeleteReview = () => {
    deleteReview.mutate({ id: userReviewData.id });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="review_message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex items-center mb-6">
                <FormLabel className="mr-4">
                  Give rating about this book
                </FormLabel>
                <Badge>The rating you gave: ⭐ {userReviewData?.rating}</Badge>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">1.0 ⭐</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">2.0 🌟</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">3.0 ✨</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">4.0 💫</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" />
                    </FormControl>
                    <FormLabel className="font-normal">5.0 🌠</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {userReviewData && Object.keys(userReviewData).length > 0 ? (
          <Button disabled>User already submit message</Button>
        ) : (
          // <AlertDialog>
          //   <AlertDialogTrigger asChild>
          //     <Button variant="destructive">Delete</Button>
          //   </AlertDialogTrigger>
          //   <AlertDialogContent>
          //     <AlertDialogHeader>
          //       <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          //       <AlertDialogDescription>
          //         This action cannot be undone. This will permanently delete
          //         this book and remove your data from our servers.
          //       </AlertDialogDescription>
          //     </AlertDialogHeader>
          //     <AlertDialogFooter>
          //       <AlertDialogCancel>Cancel</AlertDialogCancel>
          //       {userReviewData && userReviewData.id && (
          //         <AlertDialogAction onClick={handleDeleteReview}>
          //           Continue
          //         </AlertDialogAction>
          //       )}
          //     </AlertDialogFooter>
          //   </AlertDialogContent>
          // </AlertDialog>
          <Button type="submit">
            {createReviewMutation.isPending
              ? "Please wait..."
              : "Tell us your review about this book"}
          </Button>
        )}
        <FormDescription>
          Sorry for now the action to delete review message is not yet available
        </FormDescription>
      </form>
    </Form>
  );
}
