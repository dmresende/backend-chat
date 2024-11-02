import express from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, userController.getAllUsers); // Sem type assertion
router.get("/me", authMiddleware, userController.getMe); // Sem type assertion

export default router;
