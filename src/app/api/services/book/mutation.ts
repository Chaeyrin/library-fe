import { Books } from "@/types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook, deleteBook, updateBook } from "./api";
import { useToast } from "@/components/ui/use-toast";

export function useCreateBook() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Books) => await createBook(data),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: (response) => {
      console.log("success", response);
      toast({
        variant: "default",
        title: "Success",
        description: response.data.message,
      });
      // queryClient.invalidateQueries({ queryKey: ["books"] });
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["books"] });
      }
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Books) => updateBook(data),

    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: (response) => {
      console.log("success", response);
      toast({
        variant: "default",
        title: "Success",
        description: response.data.message,
      });
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["book"] });
        await queryClient.invalidateQueries({
          queryKey: ["book", { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBook(id),

    onSuccess: () => {
      console.log("Deleted Successfully");
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["books"] });
      }
    },
  });
}
