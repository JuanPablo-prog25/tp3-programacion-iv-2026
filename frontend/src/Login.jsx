import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "./Auth";

export function Login() {
  const { error, login, limpiarErrores } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
    limpiarErrores();
   },[limpiarErrores]);

  const handleSubmit =  async(e) => {
    e.preventDefault();
   

     const res = await login(email, password);

     if (res.success) {
       navigate("/");
     }
  };

  return (
    <>
      <h2>Ingresar</h2>

      <form onSubmit={handleSubmit}>

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)
          }
        />

        <label>Contraseña</label>

        <input
          type="password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)
          }
        />

        {error && <p style={{ color: "red" }}>{error}</p>}


        <button type="submit">
          Ingresar
        </button>

        <p>
       No tiene cuenta?
      </p>

      <Link to="/registro">
       Registrarse
      </Link>

    </form>
    </>
  );
}