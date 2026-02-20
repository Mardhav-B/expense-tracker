import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import UserHome from "@/pages/user/UserHome";
import Transactions from "@/pages/user/Transactions";
import AdminHome from "@/pages/admin/AdminHome";
import UserDetails from "@/pages/admin/UserDetails";
import UsersList from "@/pages/admin/UsersList";

function Protected({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "admin" | "user";
}) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {}
        <Route
          path="/"
          element={
            <Protected role="user">
              <UserHome />
            </Protected>
          }
        />
        <Route
          path="/transactions"
          element={
            <Protected role="user">
              <Transactions />
            </Protected>
          }
        />

        {}
        <Route
          path="/admin"
          element={
            <Protected role="admin">
              <AdminHome />
            </Protected>
          }
        />
        <Route
          path="/admin/users"
          element={
            <Protected role="admin">
              <UsersList />
            </Protected>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <Protected role="admin">
              <UserDetails />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
