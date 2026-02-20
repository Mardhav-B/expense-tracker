import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  credit: number;
  debit: number;
}

export default function ExpenseIncomeBarChart({ credit, debit }: Props) {
  const data = [{ name: "Transactions", Credit: credit, Debit: debit }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end gap-4 mb-2">
          <Badge variant="default">Credit</Badge>
          <Badge variant="destructive">Debit</Badge>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#f9f9f9",
              }}
            />
            <Bar dataKey="Credit" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Debit" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
