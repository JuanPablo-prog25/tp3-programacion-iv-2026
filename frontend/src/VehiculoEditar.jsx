import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "./Auth";

export function VehiculoEditar() {

  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    patente: "",
    anio: "",
    capacidad_carga: "",
  });
  const [error, setError] = useState("");

  

  const { id } = useParams();

  const navigate = useNavigate();

  const { fetchAuth } = useAuth();

  useEffect(() => {

    const obtenerVehiculo = async () => {

        const response =await fetchAuth(`http://localhost:3000/vehiculos/${id}`);

        if (!response.ok) {
          return;
        }

        const vehiculo =await response.json();

        setVehiculo(vehiculo);

      };

    obtenerVehiculo();

  }, [id, fetchAuth]);

  return (
    <>
      <h2>Editar vehiculo</h2>

      <form
        onSubmit={async (e) => {

          e.preventDefault();
          setError("");

          if (!vehiculo.marca.trim() ||!vehiculo.modelo.trim() ||!vehiculo.patente.trim())
         {
            setError( "Complete todos los campos");
             return;
          }

          if (vehiculo.anio < 1990 || vehiculo.anio > new Date().getFullYear()) {
            setError("Ingrese un año valido");
            return;
          }

          if (vehiculo.capacidad_carga <= 0) {
            setError("La capacidad de carga debe ser mayor a 0");
            return;
          }

          const response =await fetchAuth(`http://localhost:3000/vehiculos/${id}`,{
                method: "PUT",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                 body: JSON.stringify( vehiculo),
                }
            );

          if (!response.ok) {

            const err =await response.json();

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
          value={vehiculo.marca}
          onChange={(e) =>setVehiculo((v) => ({ ...v,marca: e.target.value,}))
        }
        />

        <label htmlFor="modelo">
          Modelo:
        </label>

        <input
          type="text"
          id="modelo"
          required
          value={vehiculo.modelo}
          onChange={(e) => setVehiculo((v) => ({ ...v, modelo:e.target.value,}))
          }
        />

        <label htmlFor="patente">
          Patente:
        </label>

        <input
          type="text"
          id="patente"
          required
          value={vehiculo.patente}
          onChange={(e) =>setVehiculo((v) => ({  ...v, patente:  e.target.value,}))
          }
        />

        <label htmlFor="anio">
          Año:
        </label>

        <input
          type="number"
          id="anio"
          required
          min={1990}
          max={new Date().getFullYear()}
          value={vehiculo.anio}
          onChange={(e) => setVehiculo((v) => ({...v,anio: Number( e.target.value),}))
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
          value={
            vehiculo.capacidad_carga
          }
          onChange={(e) =>setVehiculo((v) => ({...v,capacidad_carga:Number(e.target.value),}))
          }
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>

          <button type="submit">
            Guardar
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