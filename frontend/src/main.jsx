import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route,} from "react-router";

import { AuthProvider } from "./Auth";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Login } from "./Login";
import { AuthLayout } from "./AuthLayout";
import { Vehiculos } from "./Vehiculos";
import { VehiculoDetalles } from "./VehiculoDetalles";
import { Conductores } from "./Conductores";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />}
            />

            <Route path="login" element={<Login />}
            />
          </Route>

            <Route path="vehiculos" element={<AuthLayout />}>
              <Route index element={<Vehiculos />} />
              <Route path=":id" element={<VehiculoDetalles />} />
            </Route>
            
            <Route path="conductores" element={<AuthLayout />}>
              <Route index element={<Conductores />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
