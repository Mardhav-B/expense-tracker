import type { User, Transaction } from "@/types";

const USERS_KEY = "finance-users";
const TX_KEY = "finance-transactions";
const CURRENT_KEY = "finance-current-user";

export const getUsers = (): User[] =>
  JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

export const saveUsers = (users: User[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getTransactions = (): Transaction[] =>
  JSON.parse(localStorage.getItem(TX_KEY) || "[]");

export const saveTransactions = (tx: Transaction[]) =>
  localStorage.setItem(TX_KEY, JSON.stringify(tx));

export const getCurrentUser = (): User | null =>
  JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");

export const setCurrentUser = (user: User | null) =>
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
