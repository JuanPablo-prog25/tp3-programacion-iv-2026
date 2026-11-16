import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "./Auth";

export function VehiculoDetalles() {

  const [vehiculo, setVehiculo] = useState(null);

  const [viajes, setViajes] = useState([]);

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


   const obtenerViajes = useCallback(async () => {
      const url = new URL( `http://localhost:3000/viajes/vehiculo/${id}` );

    const response = await fetchAuth(url);
    if (!response.ok) {
      console.error( "Fallo al pedir viajes");

      setViajes([]);

      return;
    }

    const viajes = await response.json();

    setViajes(viajes);

  }, [id, fetchAuth]);

  useEffect(() => {
    obtenerVehiculo();
    obtenerViajes();
  }, [obtenerVehiculo, obtenerViajes]);

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
      <h3>
        Historial de viajes
      </h3>
       {viajes.length === 0 ? (
        <p>No hay viajes registrados</p>
      ) : (

    <table>
      
    <thead>
      <tr>
        <th>Origen</th>
        <th>Destino</th>
        <th>Km</th>
      </tr>
    </thead>

    <tbody>

      {viajes.map((viaje) => (
        <tr key={viaje.id}>

          <td>
            {viaje.origen}
          </td>

          <td>
            {viaje.destino}
          </td>

          <td>
            {viaje.kilometros}
          </td>

        </tr>
      ))}

    </tbody>

  </table>

  )}
   <p>
    Total kilometros recorridos:
      <b>
        {" "}
       { viajes.reduce(( total, viaje ) => total + Number(viaje.kilometros), 0) } km
   </b>

  </p>
  <Link to="/vehiculos">
  <button>Volver</button>
   </Link>
   </>
  );
}
