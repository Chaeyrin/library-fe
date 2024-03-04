"use client";

import {
  useAcceptBorrow,
  useRejectedBorrow,
} from "@/app/api/services/borrow/mutation";
import { Button } from "@/components/ui/button";

export default function AcceptBorrow({ bookId }: any) {
  const acceptBorrowMutation = useAcceptBorrow();
  const rejectedBorrowMutation = useRejectedBorrow();

  const handleAccept = () => {
    acceptBorrowMutation.mutate({ id: bookId });
  };

  const handleRejected = () => {
    rejectedBorrowMutation.mutate({ id: bookId });
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={handleAccept}>
        ✔️
      </Button>
      <Button variant="secondary" size="icon" onClick={handleRejected}>
        ❌
      </Button>
    </div>
  );
}
