import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

//conexão com mongoDB
mongoose
  .connect("string_conection")
  .then(() => console.log("Conectado ao MongoDB 🚀"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB", err));

// Middleware
app.use(express.json());
// ... (outros middlewares e rotas)

//inicio abertura do meu socket.io
io.on("connection", (socket) => {
  console.log("Socket conectado ", socket.id);

  socket.on("", () => {
    console.log("Socket disconectado ", socket.id);
  });
});

//escuta meu server
server.listen(PORT, () => {
  console.log(`Servidor rodando em localhost:${PORT}`);
});
