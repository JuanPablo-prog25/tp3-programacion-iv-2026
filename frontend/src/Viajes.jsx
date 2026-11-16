import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router";


export function Viajes() {

  const [viajes, setViajes] = useState([]);

  const { fetchAuth } = useAuth();

  const obtenerViajes = useCallback( async () => {

    const url = new URL("http://localhost:3000/viajes");

      const response = await fetchAuth(url);

       if (!response.ok) {

      console.error( "Fallo al pedir viajes");

      setViajes([]);

      return;
    }

    const viajes = await response.json();

    setViajes(viajes);

  }, [fetchAuth]);

  useEffect(() => {
    obtenerViajes();
  }, [obtenerViajes]);

  return (
    <>
      <h1>Viajes</h1>
      <Link to="/viajes/crear">
        <button> Nuevo viaje </button>
        </Link>
       

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehículo</th>
            <th>Conductor</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Km</th>
            <th>Observaciones</th>
          </tr>
        </thead>

        <tbody>

          {viajes.map((viaje) => (
            <tr key={viaje.id}>

              <td>{viaje.id}</td>

              <td>{viaje.marca} {viaje.modelo}</td>

              <td>{viaje.nombre} {viaje.apellido}</td>

              <td>{viaje.origen}</td>

              <td>{viaje.destino}</td>

              <td>{viaje.kilometros}</td>
              
              <td>{viaje.observaciones}</td>

            </tr>
          ))}

        </tbody>
      </table>
    </>
  );
}
