import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./Auth";

export function ConductorCrear() {


  const [nuevoConductor, setNuevoConductor] = useState({
    nombre: "",
    apellido: "",
    numero_documento: "",
    numero_licencia: "",
    fecha_alta_licencia: "",
    fecha_vencimiento_licencia: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { fetchAuth } = useAuth();

  return (
    <>
      <h2>Nuevo conductor</h2>

      <form
        onSubmit={async (e) => {

          e.preventDefault();

          if (
            !nuevoConductor.nombre.trim() ||
            !nuevoConductor.apellido.trim() ||
            !nuevoConductor.numero_documento.trim() ||
            !nuevoConductor.numero_licencia.trim()
          ) {
            setError("Complete todos los campos");
            return;
          }

          if (
            !nuevoConductor.fecha_alta_licencia || !nuevoConductor.fecha_vencimiento_licencia
          ) {
            setError("Debe completar las fechas");
                return;
          }

          if (  nuevoConductor.fecha_vencimiento_licencia <= nuevoConductor.fecha_alta_licencia) 
            { 
                setError("La fecha de vencimiento debe ser posterior a la fecha de alta");
                 return;
            }

            if(nuevoConductor.numero_documento.length !== 8) {
                setError("El número de documento debe tener 8 dígitos");
                return;
            }

          const response = await fetchAuth("http://localhost:3000/conductores",{
              method: "POST",
              headers: {"Content-Type": "application/json",},
              body: JSON.stringify(nuevoConductor),
            }
          );

          if (!response.ok) {

            const err = await response.json();

            console.error(`Error ${response.status}: ${err.mensaje}`);

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
          value={nuevoConductor.nombre}
          onChange={(e) =>setNuevoConductor((c) => ({...c,nombre: e.target.value,}))
          }
        />

        <label htmlFor="apellido">
          Apellido:
        </label>

        <input
          type="text"
          id="apellido"
          required
          value={nuevoConductor.apellido}
          onChange={(e) => setNuevoConductor((c) => ({ ...c,apellido: e.target.value,}))
          }
        />

        <label htmlFor="documento">
          Documento:
        </label>

        <input
          type="text"
          id="documento"
          required
          maxlength={8}
          value={nuevoConductor.numero_documento}
          onChange={(e) =>setNuevoConductor((c) => ({...c,numero_documento: e.target.value,}))
          }
        />

        <label htmlFor="licencia">
          Número de licencia:
        </label>

        <input
          type="text"
          id="licencia"
          required
          value={nuevoConductor.numero_licencia}
          onChange={(e) =>setNuevoConductor((c) => ({...c,numero_licencia: e.target.value,}))
          }
        />

        <label htmlFor="alta">
          Fecha alta licencia:
        </label>

        <input
          type="date"
          id="alta"
          required
          value={nuevoConductor.fecha_alta_licencia}
          onChange={(e) =>setNuevoConductor((c) => ({...c,fecha_alta_licencia: e.target.value,}))
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
            nuevoConductor.fecha_vencimiento_licencia
          }
          onChange={(e) =>setNuevoConductor((c) => ({ ...c, fecha_vencimiento_licencia: e.target.value,}))
          }
        />

        {error && <p style={{ color: "red" }}>{error}</p>}


        <div>

          <button type="submit">
            Crear
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