import { useCancelBorrow } from "@/app/api/services/borrow/mutation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DeleteBorrow({ bookId }: any) {
  const cancelBorrowMutation = useCancelBorrow();

  // const handleCancel = async () => {
  //   await cancelBorrowMutation.mutateAsync({ id: bookId });
  // };

  const handleCancel = () => {
    cancelBorrowMutation.mutate({ id: bookId });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCancel}
      disabled={cancelBorrowMutation.isPending}
    >
      Delete 🗑️
    </Button>
  );
}
