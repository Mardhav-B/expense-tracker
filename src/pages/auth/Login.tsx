import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUsers } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = getUsers();

    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) return alert("Invalid credentials");

    login(user);

    if (user.role === "admin") navigate("/admin");
    else navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader className="text-xl font-bold">Login</CardHeader>
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
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>

          <p className="text-sm text-center">
            No account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
