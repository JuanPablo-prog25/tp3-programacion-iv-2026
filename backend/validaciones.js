import { validationResult, param, body} from "express-validator";
import passport from "passport";

export const validarAutenticacion = passport.authenticate("jwt", {
  session: false,
});

    //validacion para los vehiculos
    export const validarVehiculo = [
    body("marca").notEmpty().isLength({ min: 1, max: 50 }),
    body("modelo").notEmpty().isLength({ min: 1, max: 50 }),
    body("patente").notEmpty().isLength({ min: 1, max: 20 }),
    body("anio").isInt({ min: 1990 }),
    body("capacidad_carga").isFloat({ min: 0 }),
];

export const validarId = param("id").isInt({ min: 1 });



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