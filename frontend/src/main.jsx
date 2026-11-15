import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route,} from "react-router";

import { AuthProvider } from "./Auth";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Login } from "./Login";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={<Home />}
            />

            <Route
              path="login"
              element={<Login />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
