import express from "express";
import { db } from "./db.js";
import { body } from "express-validator";
import { verificarValidaciones } from "./validaciones.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const router = express.Router();

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {
      next(null, payload);
    }),
  );
}

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isAlphanumeric("es-ES").isLength({ max: 50 }),
  ],
  verificarValidaciones,
  async (req, res) => {
    const { email, password } = req.body;

    const [usuarios] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
    );

    if (usuarios.length === 0) {
      return res.status(400).json("Usuario invalido");
    }

    const passwordComparada = await bcrypt.compare(
      password,
      usuarios[0].password,
    );

    if (!passwordComparada) {
      return res.status(400).json("Contraseña invalida");
    }

    const payload = {
      userId: usuarios[0].id,
      email: usuarios[0].email,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      },
    );

    res.json({
      token,
      nombre: usuarios[0].nombre,
      email: usuarios[0].email,
    });
  },
);

export default router;