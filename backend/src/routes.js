/**
 * 1- inicia o express
 * 2- inicia o modulo de roteamento
 * 3- rotas
 * 4- exporta o arquivo para que possa ser lido em outro lugar
 */
//1
const express = require("express");

//
const multer = require("multer");
const multerConfig = require("./config/multer");

//2
const routes = express.Router();

// Controllers
const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

//3
routes.get("/", (req, res) => {
  return res.send("ola");
});

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"),
  FileController.store
);

//4
module.exports = routes;
