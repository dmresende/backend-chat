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
import Message from "./models/Message";

const app = express();
const server = http.createServer(app);
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

// Socket.IO
interface ServerToClientEvents {
  newMessage: (message: any) => void;
  error: (error: any) => void;
}

interface ClientToServerEvents {
  join: (userId: string) => void;
  sendMessage: (messageData: any) => void;
  disconnect: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log("Usuário entrou na sala:", userId);
  });

  socket.on("sendMessage", async (messageData: any) => {
    try {
      const { sender, recipient, content } = messageData;

      //TODO - **Implemente as validações!**

      const newMessage = new Message({
        sender,
        recipient,
        content,
      });

      const savedMessage = await newMessage.save();

      io.to(recipient).emit("newMessage", savedMessage);
      io.to(sender).emit("newMessage", savedMessage);
    } catch (error) {
      console.log("Erro ao enviar mensagem:", error);
      socket.emit("error", { message: "Erro ao enviar mensagem" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

const main = async () => {
  try {
    await connectDB();

    // Middleware converte para obj js +json
    app.use(express.json());

    app.use("/auth", authRoutes);

    server.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

main();
