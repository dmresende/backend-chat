import express from "express";
import authController from "../controllers/authController"; // Importe o controller

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
