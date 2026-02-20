import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const items =
    user?.role === "admin"
      ? [
          { name: "Home", path: "/admin" },
          { name: "View Users", path: "/admin/users" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Transactions", path: "/transactions" },
        ];

  return (
    <Card className="h-screen w-48 p-4">
      <CardContent className="flex flex-col gap-3">
        {items.map((item) => (
          <button
            key={item.name}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
