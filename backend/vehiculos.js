import express from "express";
import { db } from "./db.js";
import {
  validarAutenticacion,
  validarId,
  validarVehiculo,
  verificarValidaciones,
} from "./validaciones.js";

const router = express.Router();

router.get("/", validarAutenticacion, async (req, res) => {
    const [vehiculos] = await db.execute("SELECT * FROM vehiculos");
     res.json(vehiculos);
  });

  router.get(
  "/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [vehiculos] = await db.execute(
      "SELECT * FROM vehiculos WHERE id=?",
      [id]
    );

    if (vehiculos.length === 0) {
      return res.status(404).json("Vehiculo no encontrado");
    }

    res.json(vehiculos[0]);
  }
);

router.post(
  "/",
  validarAutenticacion,
  validarVehiculo,
  verificarValidaciones,
  async (req, res) => {

    const {
      marca,
      modelo,
      patente,
      anio,
      capacidad_carga,
    } = req.body;

    const [vehiculoExistente] = await db.execute(
      "SELECT id FROM vehiculos WHERE patente=?",
      [patente]
    );

    if (vehiculoExistente.length > 0) {
      return res.status(400).json( "La patente ya existe");
    }

    const [result] = await db.execute(
      `INSERT INTO vehiculos
      (marca, modelo, patente, anio, capacidad_carga)
      VALUES (?,?,?,?,?)`,
      [
        marca,
        modelo,
        patente,
        anio,
        capacidad_carga,
      ]
    );

    res.status(201).json({
      mensaje: "Vehiculo creado correctamente",
      id: result.insertId,
    });
  }
);

router.put(
  "/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const {
      marca,
      modelo,
      patente,
      anio,
      capacidad_carga,
    } = req.body;

    const [result] = await db.execute(
      `UPDATE vehiculos
       SET marca=?,
           modelo=?,
           patente=?,
           anio=?,
           capacidad_carga=?
       WHERE id=?`,
      [
        marca,
        modelo,
        patente,
        anio,
        capacidad_carga,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json("Vehiculo no encontrado");
    }

    res.status(200).json({
      mensaje: "Vehiculo actualizado correctamente",
      vehiculo: {
        id,
        marca,
        modelo,
        patente,
        anio,
        capacidad_carga,
      },
    });
  }
);

router.delete(
  "/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [result] = await db.execute(
      "DELETE FROM vehiculos WHERE id=?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res .status(404).json("Vehiculo no encontrado");
    }

    res.status(200).json({mensaje: "Vehiculo eliminado", });
  }
);

router.get(
  "/:id/kilometros",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {

    const id = Number(req.params.id);

    const [vehiculos] = await db.execute(
      "SELECT id FROM vehiculos WHERE id=?",
      [id]
    );

    if (vehiculos.length === 0) {
      return res.status(404).json(
        "Vehiculo no encontrado"
      );
    }

    const [resultado] = await db.execute(
      `SELECT SUM(kilometros) AS kilometros_recorridos
       FROM viajes
       WHERE vehiculo_id=?`,
      [id]
    );

    res.json({
      vehiculo_id: id,
      kilometros_recorridos:
        resultado[0].kilometros_recorridos ?? 0,
    });
  }
);

export default router;