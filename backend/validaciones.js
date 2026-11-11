import { validationResult } from "express-validator";
import passport from "passport";

export const validarAutenticacion = passport.authenticate("jwt", {
  session: false,
});

export const verificarValidaciones = (req, res, next) => {
  const resultadoValidacion = validationResult(req);

  if (!resultadoValidacion.isEmpty()) {
    return res.status(400).json({
      mensaje: "Parametros no validos",
      errores: resultadoValidacion.array(),
    });
  }

  next();
};