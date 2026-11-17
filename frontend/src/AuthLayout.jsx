import { Outlet, Link } from "react-router";
import { useAuth } from "./Auth";

export function AuthLayout() {
    const { isAuthenticated,} = useAuth();

  if (!isAuthenticated) {
    return (
      <>
      <p>
        No esta autenticado
      </p>
      <Link to="/">
          <button>Volver al inicio</button>
        </Link>
      </>
    );
  }
  
  return (
    <>

      <nav className="menu-principal">

        <Link to="/">
          Inicio
        </Link>


        <Link to="/vehiculos">
          Vehículos
        </Link>

      
        <Link to="/conductores">
          Conductores
        </Link>

      

        <Link to="/viajes">
          Viajes
        </Link>

      </nav>

      <Outlet />

    </>
  );
}








