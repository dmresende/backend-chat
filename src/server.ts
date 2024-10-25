import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//conexão com mongoDB
mongoose
  .connect(MONGO_URI as string)
  .then(() => console.log("Conectado ao MongoDB 🚀"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB", err));

// Middleware converte para obj js +json
app.use(express.json());
// ... (outros middlewares e rotas)

//chamada das rotas
app.use("/auth", authRoutes);

//inicio abertura do meu socket.io
io.on("connection", (socket) => {
  console.log("Socket conectado ", socket.id);

  socket.on("", () => {
    console.log("Socket disconectado ", socket.id);
  });
});

//escuta meu server
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
