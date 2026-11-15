import {createContext, useCallback, useContext, useState, } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children,}) => {

  const [token, setToken] = useState(null);

  const [nombre, setNombre] = useState(null);

  const [email, setEmail] = useState(null);

  const [error, setError]= useState(null);

  const login = useCallback(async (email, password) => {setError(null);
    
    try {

        const response = await fetch("http://localhost:3000/auth/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({email, password,}),
            }
          );

        const session =await response.json();

        if (!response.ok) {
          throw new Error(
            typeof session === "string"
              ? session
              : session.mensaje
          );
        }

        setToken(session.token);

        setNombre(session.nombre);

        setEmail(session.email);

        return {success: true,};

      } catch (err) {

        setError(err.message);

        return {success: false,};
      }
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);

      setNombre(null);

      setEmail(null);

      setError(null);

    },
    []
  );

  const fetchAuth = useCallback( async (url,options = {}) => {

        if (!token) {
          throw new Error(
            "No esta autenticado"
          );
        }

        return fetch(url, { ...options, headers: { ...options.headers, Authorization:`Bearer ${token}`,},});
      }, [token]
    );

  return (
    <AuthContext.Provider
      value={{
        token,
        nombre,
        email,
        error,

        isAuthenticated:
          !!token,

        login,
        logout,
        fetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};