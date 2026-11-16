import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";

export function Vehiculos() {

  const [vehiculos, setVehiculos] = useState([]);

  const { fetchAuth } = useAuth();

  const obtenerVehiculos = useCallback(
    async () => {

      const response = await fetchAuth(
        "http://localhost:3000/vehiculos"
      );

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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Patente</th>
            <th>Año</th>
          </tr>
        </thead>

        <tbody>

          {vehiculos.map( (vehiculo) => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.id}</td>

                <td>{vehiculo.marca}</td>

                <td>{vehiculo.modelo}</td>

                <td>{vehiculo.patente}</td>

                <td>{vehiculo.anio}</td>
              </tr>
            )
          )}

        </tbody>
      </table>

    </>
  );
}