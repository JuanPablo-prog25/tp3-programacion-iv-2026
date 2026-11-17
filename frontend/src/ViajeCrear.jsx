import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./Auth";
import { useCallback, useEffect } from "react";

export function ViajeCrear() {

  const [nuevoViaje, setNuevoViaje] = useState({
    vehiculo_id: "",
    conductor_id: "",
    fecha_salida: "",
    fecha_llegada: "",
    origen: "",
    destino: "",
    kilometros: "",
    observaciones: "",
  });

  const [vehiculos, setVehiculos] = useState([]);

  const [conductores, setConductores] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { fetchAuth } = useAuth();

  useEffect(() => {

  const cargarDatos = async () => {

    const vehiculosResponse = await fetchAuth("http://localhost:3000/vehiculos");

    const conductoresResponse = await fetchAuth("http://localhost:3000/conductores");

    const vehiculos = await vehiculosResponse.json();

    const conductores =  await conductoresResponse.json();
    setVehiculos(vehiculos);

    setConductores(conductores);

     };

     cargarDatos();

    }, [fetchAuth]);

 

  return (
    <>
      <h2>Nuevo viaje</h2>

      <form
        onSubmit={async (e) => {

          e.preventDefault();

          setError("");

          if (
            !nuevoViaje.vehiculo_id ||
            !nuevoViaje.conductor_id ||
            !nuevoViaje.fecha_salida ||
            !nuevoViaje.fecha_llegada ||
            !nuevoViaje.origen.trim() ||
            !nuevoViaje.destino.trim()
          ) {
            setError(
              "Complete todos los campos obligatorios"
            );

            return;
          }

          if (nuevoViaje.fecha_llegada < nuevoViaje.fecha_salida )
             {
            setError( "La fecha de llegada debe ser posterior a la fecha de salida");

            return;
          }

          if ( nuevoViaje.kilometros < 0) {
            setError("Los kilometros deben ser mayores o iguales a 0");

            return;
          }

          const response =
            await fetchAuth( "http://localhost:3000/viajes", {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(nuevoViaje),
              }
            );

          if (!response.ok) {

            const err =await response.json();

            console.error(`Error ${response.status}:`, err);

            return;
          }

          navigate("/viajes");

        }}
      >

        <label htmlFor="vehiculo">
         Vehículo:
        </label>

        <select
         id="vehiculo"
         required
         value={nuevoViaje.vehiculo_id}
        onChange={(e) => setNuevoViaje((v) => ({...v, vehiculo_id: Number(e.target.value),}))}
        >
        <option value="">
         Seleccione vehículo
        </option>

        {vehiculos.map((vehiculo) => (
         <option
          key={vehiculo.id}
         value={vehiculo.id}
         >
        {vehiculo.marca} {vehiculo.modelo}
        </option>
        ))}
        </select>
    
      

        <label htmlFor="conductor">
           Conductor:
        </label>

        <select
         id="conductor"
         required
         value={nuevoViaje.conductor_id}
        onChange={(e) => setNuevoViaje((v) => ({...v, conductor_id: Number(e.target.value),}))}
        >
        <option value="">
         Seleccione conductor
        </option>

        {conductores.map((conductor) => (
         <option
          key={conductor.id}
         value={conductor.id}
         >
        {conductor.nombre} {conductor.apellido}
        </option>
        ))}
        </select>


        <label htmlFor="fechaSalida">
          Fecha salida:
        </label>

        <input
          type="date"
          id="fechaSalida"
          required
          value={nuevoViaje.fecha_salida}
          onChange={(e) => setNuevoViaje((v) => ({   ...v, fecha_salida: e.target.value, }))}
        />

        <label htmlFor="fechaLlegada">
          Fecha llegada:
        </label>

        <input
          type="date"
          id="fechaLlegada"
          required
          value={nuevoViaje.fecha_llegada}
          onChange={(e) => setNuevoViaje((v) => ({ ...v, fecha_llegada: e.target.value, })) }
        />

        <label htmlFor="origen">
          Origen:
        </label>

        <input
          type="text"
          id="origen"
          required
          value={nuevoViaje.origen}
          onChange={(e) => setNuevoViaje((v) => ({  ...v,origen: e.target.value,}))}
        />

        <label htmlFor="destino">
          Destino:
        </label>

        <input
          type="text"
          id="destino"
          required
          value={nuevoViaje.destino}
          onChange={(e) =>setNuevoViaje((v) => ({  ...v, destino: e.target.value,}))}
        />

        <label htmlFor="kilometros">
          Kilómetros:
        </label>

        <input
          type="number"
          id="kilometros"
          required
          min={0}
          value={nuevoViaje.kilometros}
          onChange={(e) => setNuevoViaje((v) => ({ ...v, kilometros: Number( e.target.value),})) }
        />

        <label htmlFor="observaciones">
          Observaciones:
        </label>

        <textarea
          id="observaciones"
          value={nuevoViaje.observaciones}
          onChange={(e) =>setNuevoViaje((v) => ({ ...v, observaciones: e.target.value,}))}
        />

        {error && ( <p style={{ color: "red" }}>{error} </p>)}

        <div>

          <button type="submit">
            Crear
          </button>

          <Link to="/viajes">
            <button type="button">
              Volver
            </button>
          </Link>

        </div>

      </form>
    </>
  );
}