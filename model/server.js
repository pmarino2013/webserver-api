// const express = require("express");
import express from "express";
import router from "../routes/usuarios.js";
import cors from "cors";
import { dbConnection } from "../database/config.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";
    // this.corsOptions = { origin: "http://example.com" };
    this.ConectarDB();
    this.middlewares();
    this.routes();
  }

  async ConectarDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.usuarioPath, router);
    // this.app.get("/api", (req, res) => {
    //   res.send("Método GET ");
    // });

    // this.app.post("/api", (req, res) => {
    //   res.send("Método POST");
    // });

    // this.app.put("/api/1", (req, res) => {
    //   res.send("Método PUT");
    // });

    // this.app.delete("/api/1", (req, res) => {
    //   res.send("Método DELETE");
    // });
  }

  middlewares() {
    // this.app.use(cors(this.corsOptions));
    this.app.use(cors());

    this.app.use(express.json()); //Para poder recibir json por el body
    this.app.use(express.static("public")); //carpeta pública
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Servidor en linea en puerto ${this.port}`)
    );
  }
}

export default Server;

// module.exports = Server;
