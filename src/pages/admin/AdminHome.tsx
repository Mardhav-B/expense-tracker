import { getUsers, getTransactions } from "@/utils/storage";
import type { User, Transaction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#f43f5e",
];

export default function AdminHome() {
  const navigate = useNavigate();
  const users: User[] = getUsers();
  const transactions: Transaction[] = getTransactions();

  const pieData = users.map((u) => {
    const total = transactions
      .filter((t) => t.userId === u.id && t.type === "debit")
      .reduce((acc, t) => acc + t.amount, 0);
    return { name: u.username, value: total };
  });

  const totalUsers = users.length;
  const totalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalDebits = transactions
    .filter((t) => t.type === "debit")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalTxVolume = transactions.reduce((acc, t) => acc + t.amount, 0);

  const last10Tx = [...transactions]
    .sort((a, b) => (b.date > a.date ? 1 : -1))
    .slice(0, 10);

  return (
    <div className="p-6 space-y-6">
      {}
      <div className="grid md:grid-cols-3 gap-6">
        {}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Expenses by Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#f9f9f9",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {pieData.map((u, i) => (
                <Badge
                  key={i}
                  style={{
                    backgroundColor: COLORS[i % COLORS.length],
                    color: "#fff",
                  }}
                >
                  {u.name}: {u.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCredits}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Debits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDebits}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTxVolume}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {}
      <Card>
        <CardHeader>
          <CardTitle>Last 10 Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {last10Tx.map((tx) => {
                const user = users.find((u) => u.id === tx.userId);
                return (
                  <TableRow key={tx.id}>
                    <TableCell>
                      <button
                        className="text-blue-600 underline"
                        onClick={() => navigate(`/admin/user/${user?.id}`)}
                      >
                        {user?.username}
                      </button>
                    </TableCell>
                    <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.type === "credit" ? "secondary" : "destructive"
                        }
                      >
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{tx.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
