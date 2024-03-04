import { BorrowInterface } from "@/types/borrow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptBorrow,
  applyBorrow,
  cancelBorrow,
  receiveBorrow,
  rejectBorrow,
  returnBorrow,
} from "./api";
import { useToast } from "@/components/ui/use-toast";

export function useApplyBorrow() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BorrowInterface) => applyBorrow(data),

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

    onSuccess: (response) => {
      console.log("success");
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
        await queryClient.invalidateQueries({ queryKey: ["borrowStatus"] });
      }
    },
  });
}

export function useCancelBorrow() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BorrowInterface) => cancelBorrow(data),

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
        description: "Success cancel apply",
      });
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["borrows-user"],
        });
      }
    },
  });
}

export function useReturnBorrow() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BorrowInterface) => returnBorrow(data),

    onError: (error: any) => {
      console.log("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: (response) => {
      console.log("success");
      toast({
        variant: "default",
        title: "Success",
        description: response.data.message,
      });
    },

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["borrows-user"] });
      }
    },
  });
}

export function useAcceptBorrow() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BorrowInterface) => acceptBorrow(data),

    onError: (error: any) => {
      console.log("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: (response) => {
      console.log("success");
      toast({
        variant: "default",
        title: "Success",
        description: response.data.message,
      });
    },

    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["borrows"] });
      }
    },
  });
}

export function useRejectedBorrow() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: BorrowInterface) => rejectBorrow(data),

    onError: (error: any) => {
      console.log("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response.data.errors,
      });
    },

    onSuccess: (response) => {
      console.log("success");
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
        await queryClient.invalidateQueries({ queryKey: ["borrows"] });
      }
    },
  });
}

export function useReceiveBorrow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BorrowInterface) => receiveBorrow(data),

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["borrows"] });
      }
    },
  });
}
