import express from "express";
import { db } from "./db.js";
import {
  validarAutenticacion,
  validarId,
  validarConductor,
  verificarValidaciones,
} from "./validaciones.js";

const router = express.Router();

router.get("/", validarAutenticacion, async (req, res) => {
    const [conductores] = await db.execute("SELECT * FROM conductores");

     res.json(conductores);
  }
);

router.get(
  "/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [conductores] = await db.execute(
      "SELECT * FROM conductores WHERE id=?",
      [id]
    );

    if (conductores.length === 0) {
      return res.status(404).json( "Conductor no encontrado" );
    }

    res.json(conductores[0]);
  }
);

router.post(
  "/",
  validarAutenticacion,
  validarConductor,
  verificarValidaciones,
  async (req, res) => {
    const {
      nombre,
      apellido,
      numero_documento,
      numero_licencia,
      fecha_alta_licencia,
      fecha_vencimiento_licencia,
    } = req.body;

    const [conductorExistente] = await db.execute(
      "SELECT id FROM conductores WHERE numero_documento=?",
      [numero_documento]
    );

    if (conductorExistente.length > 0) {
      return res.status(400).json("El documento ya existe");
    }


    const [licenciaExistente] = await db.execute(
    "SELECT id FROM conductores WHERE numero_licencia=?",
    [numero_licencia]
    );

    if (licenciaExistente.length > 0) {
    return res.status(400).json("El numero de licencia ya existe");
    }

    const [result] = await db.execute(
      `INSERT INTO conductores
      (
        nombre,
        apellido,
        numero_documento,
        numero_licencia,
        fecha_alta_licencia,
        fecha_vencimiento_licencia
      )
      VALUES (?,?,?,?,?,?)`,
      [
        nombre,
        apellido,
        numero_documento,
        numero_licencia,
        fecha_alta_licencia,
        fecha_vencimiento_licencia,
      ]
    );

    res.status(201).json({
      mensaje: "Conductor creado correctamente",
      id: result.insertId,
    });
  }
);

router.put(
  "/:id",
  validarAutenticacion,
  validarId,
  validarConductor,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const {
      nombre,
      apellido,
      numero_documento,
      numero_licencia,
      fecha_alta_licencia,
      fecha_vencimiento_licencia,
    } = req.body;

    const [conductorExistente] = await db.execute(
      "SELECT id FROM conductores WHERE numero_documento=? AND id!=?",
      [numero_documento, id]
    );

    if (conductorExistente.length > 0) {
      return res.status(400).json("El documento ya existe");
    }


    const [licenciaExistente] = await db.execute(
    "SELECT id FROM conductores WHERE numero_licencia=? AND id!=?",
    [numero_licencia, id]
    );

    if (licenciaExistente.length > 0) {
    return res.status(400).json("El numero de licencia ya existe");
    }

    const [result] = await db.execute(
      `UPDATE conductores
      SET nombre=?,
          apellido=?,
          numero_documento=?,
          numero_licencia=?,
          fecha_alta_licencia=?,
          fecha_vencimiento_licencia=?
      WHERE id=?`,
      [
        nombre,
        apellido,
        numero_documento,
        numero_licencia,
        fecha_alta_licencia,
        fecha_vencimiento_licencia,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json("Conductor no encontrado");
    }

    res.status(200).json({
      mensaje: "Conductor actualizado correctamente",
      conductor: {
        id,
        nombre,
        apellido,
        numero_documento,
        numero_licencia,
        fecha_alta_licencia,
        fecha_vencimiento_licencia,
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
      "DELETE FROM conductores WHERE id=?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json("Conductor no encontrado");
    }

    res.status(200).json({
      mensaje: "Conductor eliminado",
    });
  }
);

router.get(
  "/:id/kilometros",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {

    const id = Number(req.params.id);

    const [conductores] = await db.execute(
      "SELECT id FROM conductores WHERE id=?",
      [id]
    );

    if (conductores.length === 0) {
      return res.status(404).json(
        "Conductor no encontrado"
      );
    }

    const [resultado] = await db.execute(
      `SELECT SUM(kilometros) AS kilometros_recorridos
       FROM viajes
       WHERE conductor_id=?`,
      [id]
    );

    res.json({
      conductor_id: id,
      kilometros_recorridos:
        resultado[0].kilometros_recorridos ?? 0,
    });
  }
);

export default router;