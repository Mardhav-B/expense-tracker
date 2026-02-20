import type { User, Transaction } from "@/types";

export const seedUsers: User[] = [
  { id: "1", username: "selva", password: "admin123", role: "admin" },
  { id: "2", username: "john", password: "1234", role: "user" },
  { id: "3", username: "alice", password: "abcd", role: "user" },
];

const transactionDescriptions = [
  "Salary",
  "Shopping",
  "Electricity Bill",
  "Freelance Work",
  "Food",
  "Transport",
];

const types: Transaction["type"][] = ["credit", "debit"];

export const generateMockTransactions = (
  count: number = 500,
): Transaction[] => {
  const transactions: Transaction[] = [];

  for (let i = 0; i < count; i++) {
    const user = seedUsers[Math.floor(Math.random() * seedUsers.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const amount =
      type === "credit"
        ? Math.floor(Math.random() * 5000 + 500)
        : Math.floor(Math.random() * 1000 + 50);
    const description =
      transactionDescriptions[
        Math.floor(Math.random() * transactionDescriptions.length)
      ];
    const date = new Date(
      Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 180),
    );

    transactions.push({
      id: `tx-${i + 1}`,
      userId: user.id,
      amount,
      type,
      description,
      date: date.toISOString(),
    });
  }

  return transactions;
};

export const initializeApp = () => {
  localStorage.setItem("finance-users", JSON.stringify(seedUsers));
  const transactions = generateMockTransactions(500); // generate 500 transactions
  localStorage.setItem("finance-transactions", JSON.stringify(transactions));
};
