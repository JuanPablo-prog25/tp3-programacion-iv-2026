import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { Link } from "react-router";

export function Conductores() {

  const [conductores, setConductores] = useState([]);

  const { fetchAuth } = useAuth();

  const obtenerConductores = useCallback( async () => {

    const url = new URL("http://localhost:3000/conductores");

      const response = await fetchAuth(url);

       if (!response.ok) {

      console.error("Fallo al pedir conductores"); 

      setConductores([]);

      return;
    }

    const conductores =await response.json();

    setConductores(
      conductores
    );

  }, [fetchAuth]);

  useEffect(() => {
    obtenerConductores();
  }, [obtenerConductores]);

  return (
    <>
      <h1>Conductores</h1>
      <Link to="/conductores/crear">
      <button> Nuevo conductor </button>
    </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Licencia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {conductores.map( (conductor) => (
              <tr key={conductor.id}
              >
                <td>
                  <Link to={`/conductores/${conductor.id}`} >
                  {conductor.id}
                  </Link>
                </td>

                <td>{conductor.nombre}</td>

                <td>{conductor.apellido}</td>

                <td>{conductor.numero_documento}</td>

                <td>{conductor.numero_licencia}</td>

                 <td>

                  <Link to={`/conductores/${conductor.id}/editar`}
                     >
                     <button>Editar</button>
                     </Link>

                     <button


                      onClick={async () => {
                         if (!window.confirm( `Eliminar ${conductor.nombre} ${conductor.apellido}?`) ) {
                            return;
                        }
                        const response = await fetchAuth( `http://localhost:3000/conductores/${conductor.id}`,{
                            method: "DELETE",
                        });
                         if (!response.ok) {

                        const err =await response.json();
                        console.error(err);
                         return;
                        }
                        obtenerConductores();
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