import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { getUsers, saveUsers } from "@/utils/storage";
import type { User } from "@/types";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const handleSignup = () => {
    const users = getUsers();

    if (users.find((u) => u.username === username))
      return alert("User already exists");

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      password,
      role,
    };

    saveUsers([...users, newUser]);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader className="text-xl font-bold">Signup</CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Select onValueChange={(value) => setRole(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={handleSignup}>
            Signup
          </Button>

          <p className="text-sm text-center">
            Already have account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
