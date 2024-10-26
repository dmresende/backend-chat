import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import configurePassport from "./config/passport";
import connectDB from "./config/connectionDB";
import passport from "passport"; // Importe o passport

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

configurePassport();
app.use(passport.initialize());

const main = async () => {
  try {
    await connectDB();
    console.log("Conectado ao MongoDB");

    // Middleware converte para obj js +json
    app.use(express.json());

    //chamada das rotas
    app.use("/auth", authRoutes);

    //inicio abertura do meu socket.io
    io.on("connection", (socket) => {
      console.log("Socket conectado ", socket.id);

      socket.on("Disconect", () => {
        console.log("Socket disconectado ", socket.id);
      });
    });

    //escuta meu server
    server.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};
main();
