import { request, response } from "express";
import Usuario from "../model/usuario.js";
import bcrypt from "bcryptjs";
// import { validationResult } from "express-validator";

const getUsuarios = async (req = request, res = response) => {
  // res.send("Método GET ");
  // const { nombre } = req.query;
  const { limite = 5, desde = 0 } = req.query;

  const usuarios = await Usuario.find({ estado: true })
    .limit(limite)
    .skip(desde);
  // const usuarios = await Usuario.find().limit(limite).skip(desde);
  const total = await Usuario.countDocuments({ estado: true });
  res.json({
    total,
    usuarios,
  });
};

const postUsuario = async (req = request, res) => {
  // const body = req.body;
  // res.json({
  //   body,
  // });
  const datos = req.body;

  const { nombre, email, password, rol } = datos;
  //Validar datos--------------------------
  // const errors = validationResult(req);
  // console.log(errors);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  //--------------------------------------

  const usuario = new Usuario({ nombre, email, password, rol });

  //verificar el email-------------------------------
  // const existeEmail = await Usuario.findOne({ email });

  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "El correo ya existe",
  //   });
  // }

  //encriptar contraseña-----------------------------
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar los datos en la BD
  await usuario.save();
  res.status(201).json({
    //
    msg: "Usuario creado con éxito!",
    usuario,
  });
};

const putUsuario = async (req, res) => {
  // res.send("Método PUT");
  const { id } = req.params;

  const { password, _id, email, ...resto } = req.body;

  const salt = bcrypt.genSaltSync();
  resto.password = bcrypt.hashSync(password, salt);

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.status(200).json({
    message: "Usuario actualizado",
    usuario,
  });
};

const deleteUsario = async (req, res) => {
  // res.send("Método DELETE");
  const { id } = req.params;

  //borrado físico
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

  //Inactivar un documento

  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    { new: true }
  );

  res.status(200).json({
    message: "Usuario eliminado",
    usuarioBorrado,
  });
};

export { getUsuarios, postUsuario, putUsuario, deleteUsario };
