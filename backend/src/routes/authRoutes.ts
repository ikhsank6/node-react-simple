import { Router } from "express";
import { register, login, refresh } from "../controllers/authController";
import { registerValidation, loginValidation, refreshTokenValidation } from "../validations/userValidation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/refresh", refreshTokenValidation, refresh);

export default router;
