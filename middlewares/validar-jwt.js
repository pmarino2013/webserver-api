import { request } from "express";
import jwt from "jsonwebtoken";

import Usuario from "../model/usuario.js"; //Para poder guardar los datos del usuario autenticado

const validarJWT = async (req = request, res, next) => {
  //se recibe por los headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // console.log(payload);
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //Leer el usuario segun el uid

    const usuario = await Usuario.findById({ _id: uid });

    //Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({
        msg: "El usuario no existe en la BD",
      });
    }

    //verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    req.usuario = usuario; //Puedo guardar en la req el dato del payload

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export { validarJWT };
