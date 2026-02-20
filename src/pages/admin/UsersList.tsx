import { useState } from "react";
import { getUsers, saveUsers } from "@/utils/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UsersList() {
  const [users, setUsersState] = useState(getUsers());

  const handleDelete = (id: string) => {
    const filtered = users.filter((u: any) => u.id !== id);
    saveUsers(filtered);
    setUsersState(filtered);
  };

  return (
    <div className="space-y-4 p-4 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {users.map((user: any) => (
              <li
                key={user.id}
                className="flex items-center justify-between py-2"
              >
                <span className="font-medium">{user.username}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
