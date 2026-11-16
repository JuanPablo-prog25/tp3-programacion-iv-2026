import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "./Auth";

export function VehiculoDetalles() {

  const [vehiculo, setVehiculo] = useState(null);

  const { id } = useParams();

  const { fetchAuth } = useAuth();

  const obtenerVehiculo = useCallback(async () => {
    const url = new URL(`http://localhost:3000/vehiculos/${id}`);
    const response = await fetchAuth(url);
    

    if (!response.ok) {
      console.error(
        "Fallo al pedir detalles del vehiculo"
      );

      setVehiculo(null);

      return;
    }

    const vehiculo = await response.json();

    setVehiculo(vehiculo);

  }, [id, fetchAuth]);

  useEffect(() => {
    obtenerVehiculo();
  }, [obtenerVehiculo]);

  if (!vehiculo || !id) {
    return null;
  }

  return (
    <>
      <h2>Detalle de vehículo</h2>

      <p>
        Marca: <b>{vehiculo.marca}</b>
      </p>

      <p>
        Modelo: <b>{vehiculo.modelo}</b>
      </p>

      <p>
        Patente: <b>{vehiculo.patente}</b>
      </p>

      <p>
        Año: <b>{vehiculo.anio}</b>
      </p>

      <p>
        Capacidad de carga:
        <b> {vehiculo.capacidad_carga}</b>
      </p>

      <Link to="/vehiculos">
        <button>Volver</button>
      </Link>
    </>
  );
}
