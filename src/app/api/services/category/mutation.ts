import { Category } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, deleteCategory } from "./api";
import { useToast } from "@/components/ui/use-toast";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Category) => createCategory(data),
    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast({
        variant: "destructive",
        title: "Cannot create new category",
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

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
      }
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),

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
        description: "Success delete category",
      });
    },

    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["categories"],
        });
      }
    },
  });
}
