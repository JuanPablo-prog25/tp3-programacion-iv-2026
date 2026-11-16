import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "./Auth";

export function ConductorEditar() {

  const [conductor, setConductor] = useState({
    nombre: "",
    apellido: "",
    numero_documento: "",
    numero_licencia: "",
    fecha_alta_licencia: "",
    fecha_vencimiento_licencia: "",
  });

  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const { fetchAuth } = useAuth();

  useEffect(() => {

    const obtenerConductor = async () => {

      const response =await fetchAuth(`http://localhost:3000/conductores/${id}`);

      if (!response.ok) {
        return;
      }

      const conductor =await response.json();
      setConductor(conductor);

    };

    obtenerConductor();

  }, [id, fetchAuth]);

  return (
    <>
      <h2>Editar conductor</h2>

      <form
        onSubmit={async (e) => {

          e.preventDefault();

          setError("");

          if (
            !conductor.nombre.trim() ||
            !conductor.apellido.trim() ||
            !conductor.numero_documento.trim() ||
            !conductor.numero_licencia.trim()
          ) {
            setError("Complete todos los campos");
            return;
          }

          if ( conductor.numero_documento.length !== 8) {
            setError("El documento debe tener 8 digitos" );
            return;
          }

          if (conductor.fecha_vencimiento_licencia <=conductor.fecha_alta_licencia) {
            setError( "La fecha de vencimiento debe ser posterior a la fecha de alta");
            return;
          }

          const response = await fetchAuth( `http://localhost:3000/conductores/${id}`,{
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(conductor),
              }
            );

          if (!response.ok) {

            const err = await response.json();

            console.error( `Error ${response.status}: ${err.mensaje}`);
            return;
          }

          navigate("/conductores");

        }}
      >

        <label htmlFor="nombre">
          Nombre:
        </label>

        <input
          type="text"
          id="nombre"
          required
          value={conductor.nombre}
          onChange={(e) =>setConductor((c) => ({...c,nombre: e.target.value,}))
          }
        />

        <label htmlFor="apellido">
          Apellido:
        </label>

        <input
          type="text"
          id="apellido"
          required
          value={conductor.apellido}
          onChange={(e) => setConductor((c) => ({ ...c, apellido: e.target.value,}))
          }
        />

        <label htmlFor="documento">
          Documento:
        </label>

        <input
          type="text"
          id="documento"
          required
          maxLength={8}
          value={conductor.numero_documento}
          onChange={(e) =>setConductor((c) => ({ ...c, numero_documento: e.target.value,}))
          }
        />

        <label htmlFor="licencia">
          Numero de licencia:
        </label>

        <input
          type="text"
          id="licencia"
          required
          value={conductor.numero_licencia}
          onChange={(e) => setConductor((c) => ({...c, numero_licencia: e.target.value,}))
          }
        />

        <label htmlFor="alta">
          Fecha alta licencia:
        </label>

        <input
          type="date"
          id="alta"
          required
          value={
            conductor.fecha_alta_licencia
          }
          onChange={(e) => setConductor((c) => ({...c, fecha_alta_licencia: e.target.value,}))
          }
        />

        <label htmlFor="vencimiento">
          Fecha vencimiento licencia:
        </label>

        <input
          type="date"
          id="vencimiento"
          required
          value={
            conductor.fecha_vencimiento_licencia
          }
          onChange={(e) =>setConductor((c) => ({...c, fecha_vencimiento_licencia: e.target.value,}))
          }
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>

          <button type="submit">
            Guardar
          </button>

          <Link to="/conductores">
            <button type="button">
              Volver
            </button>
          </Link>

        </div>

      </form>
    </>
  );
}