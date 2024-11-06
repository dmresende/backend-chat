import { Request, Response } from "express";
import { IUser } from "../models/User";
import User from "../models/User";

interface CustomRequest extends Request {
  user?: IUser;
}

class UserController {
  async getMe(req: CustomRequest, res: Response): Promise<void> {
    try {
      if (req.user) {
        const user = await User.findById(req.user._id);

        if (!user) {
          res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.json(user);
      } else {
        res.status(401).json({ error: "Usuário não autenticado" });
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  }

  //TODO - métodos delete e update
}

export default new UserController();
