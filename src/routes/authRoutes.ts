import express, { RequestHandler } from "express";
import passport from "passport";
import authController from "../controllers/authController";
import IAuthController from "../controllers/IAuthController";

const router = express.Router();

const controller: IAuthController = authController;

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Cadastra um novo usuário
 *     // ... (descrição dos parâmetros, body e respostas)
 */
router.post("/signup", controller.signup as RequestHandler);

//verificar session: false (pois para retornar o token  precisei passar a session com false, no passport)

/**
 * @swagger
 * /auth/post:
 *   post:
 *     summary: Login um novo usuário
 *     // ... (descrição dos parâmetros, body e respostas)
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  controller.login as RequestHandler
);

export default router;
