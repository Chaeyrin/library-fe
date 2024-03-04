import {
  useReceiveBorrow,
  useReturnBorrow,
} from "@/app/api/services/borrow/mutation";
import { Button } from "@/components/ui/button";
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

export default function ReceiveBorrow({ bookId }: any) {
  const receiveBorrowMutation = useReceiveBorrow();

  const handleReceive = () => {
    receiveBorrowMutation.mutate({ id: bookId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Receive Book ❔
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Receive books that have been borrowed.
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will return the number of stock books that have been
            borrowed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReceive}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
