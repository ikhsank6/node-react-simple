import { Router } from "express";
import { register, login, refresh } from "../controllers/authController";
import { registerValidation, loginValidation } from "../validations/userValidation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", login);
router.post("/refresh", refresh);

export default router;
