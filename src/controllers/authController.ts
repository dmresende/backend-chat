import { Request, Response } from "express"; // Importe Request e Response
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async signup(req: Request, res: Response) {
    try {
    } catch (error) {}
  }

  async login(req: Request, res: Response) {
    try {
      const secretKey = process.env.SECRET_KEY || "SEGREDO";
      const user = req.user as IUser; // Type assertion - garante que o req.user sera tipado como IUser
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: "1h" } //define o tempo de expiração do token
      ); //gera o token
      res.json({ token });
    } catch (error) {
      console.log("Error ", error);
      res.status(500).json({ error: "Falha ao  fazer login" });
    }
  }
}

export default new AuthController();
