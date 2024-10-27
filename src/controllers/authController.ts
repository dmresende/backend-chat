import { Request, Response } from "express";
import IAuthController from "./IAuthController";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController implements IAuthController {
  async signup(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { name, username, password, photo = null } = req.body;

      if (!name || !username || !password) {
        return res.status(400).json({ error: "Preencha todos os campos!" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: "Usuário já existe!" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        username,
        password: hashedPassword,
        photo,
      });

      await newUser.save();
      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }

  async login(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const secretKey = process.env.SECRET_KEY || "SEGREDO";
      const user = req.user as IUser; // Type assertion - garante que o req.user sera tipado como IUser
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        secretKey,
        { expiresIn: "1h" } //define o tempo de expiração do token
      ); //gera o token
      return res.json({ token });
    } catch (error) {
      console.log("Error ", error);
      return res.status(500).json({ error: "Falha ao  fazer login" });
    }
  }
}

export default new AuthController();
