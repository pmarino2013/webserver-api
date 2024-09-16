import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CNN);
    console.log("Base de datos online");
  } catch (err) {
    console.log(err);
    throw new Error("Error de conexion a la base de datos");
  }
};
export { dbConnection };
