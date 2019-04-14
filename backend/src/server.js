/**
 * 1- inicia o express
 * 2- define uma constante para que use o express
 * 3- a partir da const 'item 2' define qual é a porta de saída (ouvinte)
 * 4- parametros(lê no formato json, permite envio de files por form e etc)
 * 5- Rota a ser usada(aqui leia-se um outro arquivo separado)
 * 6-7 Uso de banco de dados
 */
// 1
const express = require("express");

// 6
const mongoose = require("mongoose");
//
const path = require("path");
const cors = require("cors");

// 2
const app = express();
//
app.use(cors());
//
const server = require("http").Server(app);

// real time
const io = require("socket.io")(server);
io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

//7
mongoose.connect("mongodb+srv://user:password@URL/DB?retryWrites=true", {
  useNewUrlParser: true
});
//middleware global
app.use((req, res, next) => {
  req.io = io;
  return next();
});

//
// 4
app.use(express.json());
// permite arquivos
app.use(express.urlencoded({ extended: true }));
//habilita o uso de url para leitura dos files
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

//5
app.use(require("./routes"));

// 3
server.listen(process.env.PORT || 3333);
