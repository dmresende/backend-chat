import { Request, Response, NextFunction } from "express";
import jtw from "jsonwebtoken";
import { IUser } from "../models/User";

interface CustomRequest extends Request {
  user?: IUser;
}

const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    // remove prefixo "Bearer "
    const token = authHeader.split(" ")[1];

    const secretKey = process.env.SECRET_KEY || "SEGREDO";

    jtw.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ error: "Sessão expirada, faça o login novamente" });
        }
        return res.status(401).json({ error: "Token inválido" });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log("Erro ao validar token ", error);
    res.status(500).json({ message: "Falha na autenticação" });
  }
};

export default authMiddleware;
