import { validationResult, param, body} from "express-validator";
import passport from "passport";

export const validarAutenticacion = passport.authenticate("jwt", {
  session: false,
});

//Validacion para los usuarios
export const validarUsuario = [
  body("nombre").isLength({ min: 1, max: 100 })
  .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
  body("email").isEmail()
  .withMessage("El email debe ser valido"),
  body("password").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })
  .withMessage("La contraseña no cumple los requisitos"),
];


export const validarUsuarioActualizacion = [
  body("nombre").isLength({ min: 1, max: 100 })
  .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
  body("email").isEmail()
  .withMessage("El email debe ser valido"),
];


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


export const validarViaje = [
  body("vehiculo_id").isInt({ min: 1 })
    .withMessage("El vehiculo es obligatorio"),

  body("conductor_id").isInt({ min: 1 })
    .withMessage("El conductor es obligatorio"),

  body("fecha_salida").isDate()
    .withMessage("La fecha de salida debe ser valida"),

  body("fecha_llegada").isDate()
    .withMessage("La fecha de llegada debe ser valida"),

  body("origen").isLength({ min: 1, max: 100 })
    .withMessage("El origen debe tener entre 1 y 100 caracteres"),

  body("destino").isLength({ min: 1, max: 100 })
    .withMessage("El destino debe tener entre 1 y 100 caracteres"),

  body("kilometros").isFloat({ min: 0 })
    .withMessage("Los kilometros  deben ser mayores o iguales a 0"),

  body("observaciones").optional().isLength({ max: 500 })
    .withMessage("Las observaciones no pueden superar los 500 caracteres"),
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