import express, { RequestHandler } from "express";
import authController from "../controllers/authController";
import IAuthController from "../controllers/IAuthController";
import { passportAuthMiddleware } from "../middlewares/passportAuth";

const router = express.Router();

const controller: IAuthController = authController;

router.post("/signup", controller.signup as RequestHandler);

//verificar session: false (pois para retornar o token  precisei passar a session com false, no passport)
router.post(
  "/login",
  // passport.authenticate("local", { session: false }),
  passportAuthMiddleware,
  controller.login as RequestHandler
);

export default router;
