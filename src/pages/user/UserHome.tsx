import { useAuth } from "@/context/AuthContext";
import { getTransactions } from "@/utils/storage";
import ExpenseIncomeBarChart from "@/components/charts/ExpenseIncomeBarChart";
import TransactionsTable from "@/components/tables/TransactionsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function UserHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const transactions = getTransactions()
    .filter((t) => t.userId === user!.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const credits = transactions
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);

  const debits = transactions
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome {user?.username}</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Credit</CardTitle>
          </CardHeader>
          <CardContent className="text-green-600 text-xl font-semibold">
            ₹{credits}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Debit</CardTitle>
          </CardHeader>
          <CardContent className="text-red-600 text-xl font-semibold">
            ₹{debits}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-semibold">
            ₹{credits - debits}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Income vs Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseIncomeBarChart credit={credits} debit={debits} />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Recent Transactions</CardTitle>
          <Button onClick={() => navigate("/transactions")}>Load More</Button>
        </CardHeader>
        <CardContent>
          <TransactionsTable transactions={transactions.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
}
