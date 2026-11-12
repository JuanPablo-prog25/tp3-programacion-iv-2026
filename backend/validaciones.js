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

//validacion para los conductores
export const validarConductor = [
  body("nombre").isLength({ min: 1, max: 50 })
  .withMessage("El nombre debe tener entre 1 y 50 caracteres"),
  body("apellido").isLength({ min: 1, max: 50 })
  .withMessage("El apellido debe tener entre 1 y 50 caracteres"),
  body("numero_documento")
  .isNumeric().isLength({ min: 8, max: 8 })
  .withMessage("El numero de documento debe tener 8 digitos"),
  body("numero_licencia").isLength({ min: 1, max: 30 })
  .withMessage("El numero de licencia debe tener entre 1 y 30 caracteres"),
  body("fecha_alta_licencia").isDate()
  .withMessage("La fecha de alta de licencia debe ser una fecha valida"),
  body("fecha_vencimiento_licencia").isDate()
  .withMessage("La fecha de vencimiento de licencia debe ser una fecha valida"),
];



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