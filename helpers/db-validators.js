import Usuario from "../model/usuario.js";
import Role from "../model/rol.js";

const emailExiste = async (email) => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
};

const rolValido = async (rol) => {
  const esRolValido = await Role.findOne({ rol });

  if (!esRolValido) {
    throw new Error(`${rol} no es un rol válido`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} NO existe`);
  }
  //Si el usuario existe verifico su estado
  if (!existeUsuario.estado) {
    throw new Error(`El usuario ${existeUsuario.nombre} está inactivo`);
  }
};

export { emailExiste, rolValido, existeUsuarioPorId };
