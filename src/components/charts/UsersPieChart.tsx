import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getUsers, getTransactions } from "@/utils/storage";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#f43f5e",
];

export default function UsersPieChart() {
  const users = getUsers();
  const transactions = getTransactions();

  const data = users.map((u) => {
    const total = transactions
      .filter((t) => t.userId === u.id && t.type === "debit")
      .reduce((acc, t) => acc + t.amount, 0);
    return { name: u.username, value: total };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {data.map((entry, i) => (
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
          {data.map((u, i) => (
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
  );
}
