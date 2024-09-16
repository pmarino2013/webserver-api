import { Schema, model } from "mongoose";

const RolSChema = Schema({
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

export default model("Role", RolSChema);
