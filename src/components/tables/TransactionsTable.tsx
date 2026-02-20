import type { Transaction } from "@/types";

export default function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="space-y-2">
      {transactions.map((t) => (
        <div key={t.id} className="border p-3 rounded">
          {t.description} - ₹{t.amount} ({t.type})
        </div>
      ))}
    </div>
  );
}
