import express from "express";
import { conectarDB } from "./db.js";

const app = express();
const port = 3000;

conectarDB();

app.get("/", (req, res) => {
  res.send("API TP3 funcionando");
});

app.listen(port, () => {
  console.log(`La aplicacion esta funcionando en ${port}`);
});