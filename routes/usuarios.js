import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
import {
  emailExiste,
  rolValido,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";

import {
  getUsuarios,
  postUsuario,
  putUsuario,
  deleteUsario,
} from "../controllers/usuarios.js";

const router = Router();

router.get("/", [validarJWT, esAdminRole], getUsuarios);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    // check("password", "La contraseña debe tener más de 6 caracteres").isLength({
    //   min: 6,
    // }),
    check(
      "password",
      "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial."
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),

    check("email", "El email no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("rol").custom(rolValido),

    validarCampos,
  ],
  postUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(rolValido),

    validarCampos,
  ],
  putUsuario
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsario
);

export default router;
