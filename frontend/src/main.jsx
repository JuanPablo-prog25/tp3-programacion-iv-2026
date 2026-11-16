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
import { ConductorDetalles } from "./ConductorDetalles";
import { Viajes } from "./Viajes";
import { VehiculoCrear } from "./VehiculoCrear";
import { ConductorCrear } from "./ConductorCrear";
import { ViajeCrear } from "./ViajeCrear";
import { VehiculoEditar } from './VehiculoEditar';
import { ConductorEditar } from './ConductorEditar';
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
              <Route path="crear" element={<VehiculoCrear />} />
              <Route path=":id/editar" element={<VehiculoEditar />} />
            </Route>

            <Route path="conductores" element={<AuthLayout />}>
              <Route index element={<Conductores />} />
              <Route path=":id" element={<ConductorDetalles />} />
              <Route path="crear" element={<ConductorCrear />} />
              <Route path=":id/editar" element={<ConductorEditar />} />
            </Route>

            <Route path="viajes" element={<AuthLayout />}>
              <Route index element={<Viajes />} />
              <Route path="crear" element={<ViajeCrear />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
