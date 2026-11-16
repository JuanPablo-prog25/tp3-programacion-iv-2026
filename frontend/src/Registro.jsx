import { useState } from "react";
import { Link, useNavigate } from "react-router";

export function Registro() {

  const [nombre, setNombre] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword]= useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!nombre.trim() ||!email.trim() ||!password.trim()) {
    setError("Complete todos los campos");
    return;
    }

    if(password.length < 8){
        setError("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    if(!email.includes("@")){
        setError("Ingrese un email valido");
        return;
    }

    const response = await fetch("http://localhost:3000/usuarios", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({ nombre, email, password,}),
        }
      );

    if (!response.ok) {

      const err =await response.json();

      setError(typeof err === "string"? err : err.mensaje);

      return;
    }

    navigate("/login");
  };

  return (
    <>

      <h2>
        Registro de usuario
      </h2>

      <form
        onSubmit={handleSubmit}
      >

        <label>
          Nombre
        </label>

        <input
          type="text"
          value={nombre}
          onChange={(e) =>setNombre(e.target.value)
          }
        />

        <label>
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)
          }
        />

        <label>
          Contraseña
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)
          }
        />

       {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          Registrarse
        </button>

      </form>

      <p>
        Ya tiene cuenta?
      </p>

      <Link to="/login">
        Ingresar
      </Link>

    </>
  );

}