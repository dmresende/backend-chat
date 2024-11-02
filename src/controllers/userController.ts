import { Request, Response } from "express";
import { IUser } from "../models/User";
import User from "../models/User";

interface CustomRequest extends Request {
  user?: IUser;
}

class UserController {
  async getMe(
    req: CustomRequest,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      if (req.user) {
        const user = await User.findById(req.user._id); // Busca o usuário pelo ID

        if (!user) {
          return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.json(user); // Retorna o usuário encontrado
      } else {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  }

  async getAllUsers(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const users = await User.find();
      return res.json(users); //<- retorno explicito
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return res.status(500).json({ error: "Erro ao buscar usuários." }); //<- retorno explicito
    }
  }

  //TODO - métodos delete e update
}

export default new UserController();
