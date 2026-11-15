import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>

          <li>
            <Link to="/login">Ingresar</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </main>
  );
}