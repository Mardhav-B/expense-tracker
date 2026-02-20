import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTransactions } from "@/utils/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function Transactions() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(10);
  const loader = useRef<HTMLDivElement | null>(null);

  const transactions = getTransactions()
    .filter((t) => t.userId === user!.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-3">
            {transactions.slice(0, visible).map((t) => (
              <Card key={t.id} className="p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{t.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(t.date).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">₹{t.amount}</p>
                    <Badge
                      variant={t.type === "credit" ? "default" : "destructive"}
                    >
                      {t.type}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
            <div ref={loader} className="h-10" />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
