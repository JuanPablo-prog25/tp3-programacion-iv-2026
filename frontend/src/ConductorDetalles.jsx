import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "./Auth";

export function ConductorDetalles() {

  const [conductor, setConductor] = useState(null);

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

  useEffect(() => {
    obtenerConductor();
  }, [obtenerConductor]);

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

      <Link to="/conductores">
        <button>
          Volver
        </button>
      </Link>
    </>
  );
}