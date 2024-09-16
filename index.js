// const Server = require("./model/server");
import Server from "./model/server.js";

const server = new Server();

server.listen();

// const express = require("express");
// const app = express();

// const port = 3000;

// app.get("/api", (req, res) => {
//   res.send("Método GET ");
// });

// app.post("/api", (req, res) => {
//   res.send("Método POST");
// });

// app.put("/api/1", (req, res) => {
//   res.send("Método PUT");
// });

// app.delete("/api/1", (req, res) => {
//   res.send("Método DELETE");
// });

//Para servir archivos estáticos utilice el express.static función de middleware incorporada en Express.

// Los middleware son funciones intermedias que se ejecutan entre la solicitud (request) del cliente y la respuesta (response) del servidor en una aplicación backend. Su propósito es manejar tareas comunes como la autenticación, el manejo de errores, la manipulación de datos de la solicitud, el registro de actividades, entre otros.

// app.use(express.static("public"));

// app.listen(port, () => console.log("Server online, port:", port));
