import { useToast } from "@/components/ui/use-toast";
import { UserRequest } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, registerAsUser, updateUser } from "./api";
import { useRouter } from "next/navigation";

export function useRegisterUser() {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: UserRequest) => await registerAsUser(data),

    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: any) => {
      console.error("error mutation: ", error);
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
        description:
          response.data.message + ". Please login first to enter the dashboard",
      });
      router.push("/login");
    },
  });
}

export function useCreateUser() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: UserRequest) => await createUser(data),

    onMutate: () => {
      console.log("mutate");
    },

    onError: (error: any) => {
      console.error("error mutation: ", error);
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
        description:
          response.data.message + ". Please login first to enter the dashboard",
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserRequest) => updateUser(data),

    onSuccess: () => {
      console.log("Deleted Successfully");
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        await queryClient.invalidateQueries({
          queryKey: ["users", { id: variables.id }],
        });
      }
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),

    onSuccess: () => {
      console.log("Deleted Successfully");
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}
