import { useParams } from "react-router-dom";
import { getUsers, getTransactions } from "@/utils/storage";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UserDetails() {
  const { id } = useParams();
  const users = getUsers();
  const user = users.find((u) => u.id === id);

  const [visible, setVisible] = useState(10);
  const loader = useRef<HTMLDivElement | null>(null);

  const transactions = getTransactions().filter((t) => t.userId === id);

  const credits = transactions
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);

  const debits = transactions
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + t.amount, 0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible((prev) => prev + 10);
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{user?.username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Credit: ₹{credits}</p>
          <p>Total Debit: ₹{debits}</p>
          <p>Balance: ₹{credits - debits}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {transactions.slice(0, visible).map((t) => (
                <Card key={t.id} className="p-3">
                  <div className="flex justify-between">
                    <span>{t.description}</span>
                    <Badge>{t.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">₹{t.amount}</p>
                </Card>
              ))}
              <div ref={loader} className="h-10" />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
