import express from "express";
import { db } from "./db.js";

import {
  validarAutenticacion,
  validarId,
  validarViaje,
  verificarValidaciones,
} from "./validaciones.js";

const router = express.Router();

router.get("/", validarAutenticacion, async (req, res) => {
    const [viajes] = await db.execute(
      "SELECT * FROM viajes"
    );

    res.json(viajes);
  }
);

 router.get(
  "/vehiculo/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {

    const id = Number(req.params.id);

    const [viajes] = await db.execute(
      "SELECT * FROM viajes WHERE vehiculo_id=?",
      [id]
    );

    res.json(viajes);
  }
);

router.get(
  "/conductor/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [viajes] = await db.execute(
      "SELECT * FROM viajes WHERE conductor_id=?",
      [id]
    );

    res.json(viajes);
  }
);


router.get(
  "/:id",
  validarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [viajes] = await db.execute(
      "SELECT * FROM viajes WHERE id=?",
      [id]
    );

    if (viajes.length === 0) {
      return res.status(404).json(
        "Viaje no encontrado"
      );
    }

    res.json(viajes[0]);
  }
);

router.post(
  "/",
  validarAutenticacion,
  validarViaje,
  verificarValidaciones,
  async (req, res) => {
    const {
      vehiculo_id,
      conductor_id,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      kilometros,
      observaciones,
    } = req.body;

    const [vehiculos] = await db.execute(
      "SELECT id FROM vehiculos WHERE id=?",
      [vehiculo_id]
    );

    if (vehiculos.length === 0) {
      return res.status(400).json(
        "Vehiculo inexistente"
      );
    }

    const [conductores] = await db.execute( "SELECT id FROM conductores WHERE id=?",
      [conductor_id]
    );

    if (conductores.length === 0) {
      return res.status(400).json(
        "Conductor inexistente"
      );
    }

    const [result] = await db.execute(`INSERT INTO viajes(
        vehiculo_id,
        conductor_id,
        fecha_salida,
        fecha_llegada,
        origen,
        destino,
        kilometros,
        observaciones
      ) VALUES (?,?,?,?,?,?,?,?)`,
      [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones,]
    );

    res.status(201).json({
      mensaje: "Viaje creado correctamente",
      id: result.insertId,
    });
  }
);

router.put(
  "/:id",
  validarAutenticacion,
  validarId,
  validarViaje,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const {
      vehiculo_id,
      conductor_id,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      kilometros,
      observaciones,
    } = req.body;

      const [vehiculos] = await db.execute(
      "SELECT id FROM vehiculos WHERE id=?",
      [vehiculo_id]
    );

    if (vehiculos.length === 0) {
      return res.status(400).json(
        "Vehiculo inexistente"
      );
    }

    const [conductores] = await db.execute( "SELECT id FROM conductores WHERE id=?",
      [conductor_id]
    );

    if (conductores.length === 0) {
      return res.status(400).json(
        "Conductor inexistente"
      );
    }

    const [result] = await db.execute(
      `UPDATE viajes
       SET vehiculo_id=?,
           conductor_id=?,
           fecha_salida=?,
           fecha_llegada=?,
           origen=?,
           destino=?,
           kilometros=?,
           observaciones=?
       WHERE id=?`,
      [
        vehiculo_id,
        conductor_id,
        fecha_salida,
        fecha_llegada,
        origen,
        destino,
        kilometros,
        observaciones,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(
        "Viaje no encontrado"
      );
    }

    res.status(200).json({
      mensaje: "Viaje actualizado correctamente",
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
      "DELETE FROM viajes WHERE id=?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(
        "Viaje no encontrado"
      );
    }

    res.status(200).json({
      mensaje: "Viaje eliminado",
    });
  }
);



export default router;