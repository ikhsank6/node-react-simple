import { Router } from "express";
import { getUsers,createUser } from "../controllers/userController";
import authenticateToken from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getUsers);
router.post("/", authenticateToken, createUser);

export default router;
