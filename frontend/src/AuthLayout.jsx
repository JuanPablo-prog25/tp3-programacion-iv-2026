import { Outlet } from "react-router";
import { useAuth } from "./Auth";

export function AuthLayout() {
    const { isAuthenticated,} = useAuth();

  if (!isAuthenticated) {
    return (
      <p>
        No esta autenticado
      </p>
    );
  }



  return <Outlet />;








}