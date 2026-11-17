import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./Auth";

export function VehiculoCrear() {

  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    marca: "",
    modelo: "",
    patente: "",
    anio: "",
    capacidad_carga: "",
  });

  const [error, setError]= useState("");

  const navigate = useNavigate();

  const { fetchAuth } = useAuth();

   return (
    <>
      <h2>Nuevo vehículo</h2>

      <form
        onSubmit={async (e) => {

          e.preventDefault();

           if ( !nuevoVehiculo.marca.trim() || !nuevoVehiculo.modelo.trim() ||!nuevoVehiculo.patente.trim()) {
        setError("Complete todos los campos");
         return;
        }     

        if ( nuevoVehiculo.anio < 1990 ||nuevoVehiculo.anio > new Date().getFullYear()){
             setError("Ingrese un año valido");
              return;
         }

  if (nuevoVehiculo.capacidad_carga <= 0 ) {
    setError("La capacidad de carga debe ser mayor a 0");
    return;
  }

          const response = await fetchAuth("http://localhost:3000/vehiculos",{
              method: "POST",
              headers: { "Content-Type":"application/json"},
              body: JSON.stringify(nuevoVehiculo),
            });

          if (!response.ok) {

            const err = await response.json();

            console.error(`Error ${response.status}: ${err.mensaje}`);
            return;
             }

          navigate("/vehiculos");

        }}
      >

       <label htmlFor="marca">
          Marca:
        </label>

        <input
          type="text"
          id="marca"
          required
          value={nuevoVehiculo.marca}
          onChange={(e) =>
            setNuevoVehiculo((v) => ({
              ...v,
              marca: e.target.value,
            }))
          }
        />


        <label htmlFor="modelo">
          Modelo:
        </label>

        <input
          type="text"
          id="modelo"
          required
          value={nuevoVehiculo.modelo}
          onChange={(e) =>setNuevoVehiculo((v) => ({ ...v, modelo: e.target.value,}))
          }
        />

        <label htmlFor="patente">
          Patente:
        </label>

        <input
          type="text"
          id="patente"
          required
          value={nuevoVehiculo.patente} 
          onChange={(e) => setNuevoVehiculo((v) => ({  ...v, patente: e.target.value, }))
          }
        />

        <label htmlFor="anio"> Año:</label>

        <input
          type="number"
          id="anio"
          required
          min={1990}
          max={new Date().getFullYear()}
          value={nuevoVehiculo.anio}
          onChange={(e) => setNuevoVehiculo((v) => ({...v, anio: Number(e.target.value)}))
          }
        />

        <label htmlFor="capacidad">
          Capacidad de carga:
        </label>

        <input
          type="number"
          id="capacidad"
          required
          min={0}
          value={ nuevoVehiculo.capacidad_carga}
          onChange={(e) =>setNuevoVehiculo((v) => ({...v,capacidad_carga: Number(e.target.value),}))
          }
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit">
            Crear
          </button>

          <Link to="/vehiculos">
            <button type="button">
              Volver
            </button>
          </Link>
        </div>

      </form>
    </>
  );
}