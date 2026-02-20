export type Role = "admin" | "user";
export type TransactionType = "credit" | "debit";

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: string;
}
