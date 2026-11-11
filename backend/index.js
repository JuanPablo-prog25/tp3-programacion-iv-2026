import express from "express";
import { conectarDB } from "./db.js";
import cors from "cors";

import authRouter from "./auth.js";
import usuariosRouter from "./usuarios.js";
import vehiculosRouter from "./vehiculos.js";
import conductoresRouter from "./conductores.js";
import viajesRouter from "./viajes.js";

conectarDB();

const app = express();
const port = 3000;

// Para interpretar body como JSON
app.use(express.json());

// Habilito CORS
app.use(cors());


app.use("/auth", authRouter);
app.use("/usuarios", usuariosRouter);
app.use("/vehiculos", vehiculosRouter);
app.use("/conductores", conductoresRouter);
app.use("/viajes", viajesRouter);


app.get("/", (req, res) => {
  res.send("API TP3 funcionando");
});

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en ${port}`);
});