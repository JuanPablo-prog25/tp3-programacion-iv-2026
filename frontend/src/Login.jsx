import { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({email, password, });
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

        <button type="submit">
          Ingresar
        </button>
      </form>
    </>
  );
}