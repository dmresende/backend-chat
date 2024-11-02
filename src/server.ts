import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import configurePassport from "./config/passport";
import connectDB from "./config/connectionDB";
import passport from "passport";

import swaggerUi from "swagger-ui-express";
import fs from "fs";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const swaggerFile = JSON.parse(
  fs.readFileSync("./swagger-output.json", "utf-8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

configurePassport();
app.use(passport.initialize());

const main = async () => {
  try {
    await connectDB();

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
