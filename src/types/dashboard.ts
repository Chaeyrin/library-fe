export interface CardInfo {
  totalQuantityAvailable: number;
  totalQuantityBorrowed: number;
  userCount: number;
  officerCount: number;
}

export interface CardInfoUser {
  totalCollection: number;
  totalPendingBorrowings: number;
  totalBorrowed: number;
}
