import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h1 className="font-bold text-xl">Finance Dashboard</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{user?.username}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
