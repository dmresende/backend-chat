import express from "express";
import passport from "passport";
import authController from "../controllers/authController"; // Importe o controller

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", passport.authenticate("local"), authController.login);

export default router;
