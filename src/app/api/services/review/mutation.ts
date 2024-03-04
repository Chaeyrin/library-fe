import { ReviewInterface } from "@/types/review";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview, deleteReview } from "./api";
import { useToast } from "@/components/ui/use-toast";

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ReviewInterface) => createReview(data),

    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: any) => {
      console.log("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: () => {
      console.log("success");
      toast({
        variant: "default",
        title: "Success",
        description: "Success input review",
      });
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        console.log("object");
        await queryClient.invalidateQueries({
          queryKey: ["rating", { id: variables.bookId }],
        });
        await queryClient.invalidateQueries({
          queryKey: ["review", { id: variables.bookId }],
        });
        await queryClient.invalidateQueries({
          queryKey: [
            "user-review",
            { bookId: variables.bookId, userId: variables.userId },
          ],
        });
      }
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ReviewInterface) => deleteReview(data),

    onError: (error: any) => {
      console.log("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: () => {
      console.log("success");
      toast({
        variant: "default",
        title: "Success",
        description: "Success delete your review",
      });
    },

    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        console.log("object");
        await queryClient.invalidateQueries({
          queryKey: ["rating", { id: variables.bookId }],
        });
        await queryClient.invalidateQueries({
          queryKey: ["review", { id: variables.bookId }],
        });
        await queryClient.invalidateQueries({
          queryKey: [
            "user-review",
            { bookId: variables.bookId, userId: variables.userId },
          ],
        });
      }
    },
  });
}
