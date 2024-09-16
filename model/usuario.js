import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "Falta el Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon-thumbnail.png",
  },
  rol: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

//Configurar lo que devuelve JSON
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  // usuario.uid = _id;
  return usuario;
};

export default model("Usuario", UsuarioSchema);
