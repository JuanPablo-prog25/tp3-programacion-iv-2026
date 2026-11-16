import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "./Auth";

export function ConductorDetalles() {

  const [conductor, setConductor] = useState(null);

  const [viajes, setViajes] = useState([]);

  const { id } = useParams();

  const { fetchAuth } = useAuth();

  const obtenerConductor = useCallback(async () => {
    const url = new URL(`http://localhost:3000/conductores/${id}`);
    const response = await fetchAuth(url);
     if (!response.ok) {

      console.error("Fallo al pedir detalles del conductor");

      setConductor(null);

      return;
    }

    const conductor =await response.json();

    setConductor(conductor);}, [id, fetchAuth]);

    const obtenerViajes = useCallback(async () => {
      const url = new URL( `http://localhost:3000/viajes/conductor/${id}` );

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
    obtenerConductor();
    obtenerViajes();
  }, [obtenerConductor, obtenerViajes]);

  if (!conductor || !id) {
    return null;
  }

  return (
    <>
      <h2>Detalle de conductor</h2>

      <p>
        Nombre: <b>{conductor.nombre}</b>
      </p>

      <p>
        Apellido: <b>{conductor.apellido}</b>
      </p>

      <p>
        Documento:
        <b> {conductor.numero_documento}</b>
      </p>

      <p>
        Licencia:
        <b> {conductor.numero_licencia}</b>
      </p>

      <p>
        Alta licencia:
        <b> {" "}{new Date(conductor.fecha_alta_licencia).toLocaleDateString()}</b>
      </p>

      <p>
        Vencimiento licencia:
        <b>{new Date(conductor.fecha_vencimiento_licencia).toLocaleDateString()}</b>
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

      <Link to="/conductores">
        <button>
          Volver
        </button>
      </Link>
    </>
  );
}