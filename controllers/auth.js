import { response } from "express";

import Usuario from "../model/usuario.js";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js"; //para generar token

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos",
      });
    }

    // Si el usuario está activo

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos",
      });
    }

    //verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / password no son correctos",
      });
    }

    //generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login ok",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Comuníquese con el administrador",
    });
  }
};

export { login };
