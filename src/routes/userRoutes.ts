import express, { RequestHandler } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware as RequestHandler, userController.getAllUsers);
router.get(
  "/me",
  authMiddleware as RequestHandler,
  userController.getMe as RequestHandler
);
export default router;
