import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router";

export function Vehiculos() {

  const [vehiculos, setVehiculos] = useState([]);

  const { fetchAuth } = useAuth();

  const obtenerVehiculos = useCallback( async () => {

    const url = new URL("http://localhost:3000/vehiculos");

      const response = await fetchAuth(url);

      if (!response.ok) {
        console.error("Fallo al pedir vehiculos");
        setVehiculos([]);
        return;
      }

      const vehiculos = await response.json();
        setVehiculos(vehiculos);
    },
    [fetchAuth]
  );

  useEffect(() => {
    obtenerVehiculos();
  }, [obtenerVehiculos]);

  return (
    <>
      <h1>Vehiculos</h1>
       <Link to="/vehiculos/crear">
      <button> Nuevo vehículo </button>
    </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Patente</th>
            <th>Año</th>
            <th>Capacidad de carga</th>
            <th>Acciones</th>

          </tr>
        </thead>

        <tbody>

          {vehiculos.map( (vehiculo) => (
              <tr key={vehiculo.id}>

                <td>
                <Link to={`/vehiculos/${vehiculo.id}`}>
                {vehiculo.id}
                </Link>
                </td>

                <td>{vehiculo.marca}</td>

                <td>{vehiculo.modelo}</td>

                <td>{vehiculo.patente}</td>

                <td>{vehiculo.anio}</td>

                <td>{vehiculo.capacidad_carga}</td>

                <td>
                     <button
                      onClick={async () => {
                         if (!window.confirm( `Eliminar ${vehiculo.marca} ${vehiculo.modelo}?`) ) {
                            return;
                        }
                        const response = await fetchAuth( `http://localhost:3000/vehiculos/${vehiculo.id}`,{
                            method: "DELETE",
                        });
                         if (!response.ok) {

                        const err =await response.json();
                        console.error(err);
                         return;
                        }
                        obtenerVehiculos();
                     }}
                     >
                     Eliminar
                      </button>
                </td>
              </tr>
            )
          )}

        </tbody>
      </table>

    </>
  );
}