import express from "express";
import { db } from "./db.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";
import {validarId, verificarValidaciones,} from "./validaciones.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [usuarios] = await db.execute(
    "SELECT id, nombre, email FROM usuarios"
  );

  res.json(usuarios);
});

router.get(
  "/:id",
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [usuarios] = await db.execute(
      "SELECT id, nombre, email FROM usuarios WHERE id=?",
      [id]
    );

    if (usuarios.length === 0) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.json(usuarios[0]);
  }
);

router.post(
  "/",
  [
    body("nombre").isLength({ min: 1, max: 100 }),
    body("email").isEmail(),
    body("password").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    }),
  ],
  verificarValidaciones,
  async (req, res) => {
    const { nombre, email, password } = req.body;

    const [usuarios] = await db.execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (usuarios.length > 0) {
      return res.status(400).json("El email ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?,?,?)",
      [nombre, email, hashedPassword]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
    });
  }
);

router.put(
  "/:id",
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const { nombre, email } = req.body;

    const [result] = await db.execute(
      "UPDATE usuarios SET nombre=?, email=? WHERE id=?",
      [nombre, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuario: {
        id,
        nombre,
        email
      }
    });
  }
);

router.delete(
  "/:id",
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    const [result] = await db.execute(
      "DELETE FROM usuarios WHERE id=?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json("Usuario no encontrado");
    }

    res.status(200).json({
      mensaje: "Usuario eliminado correctamente"
    });
  }
);

export default router;