import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

export function PublicRoute() {
  const token = useAuthStore((state) => state.token);
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
