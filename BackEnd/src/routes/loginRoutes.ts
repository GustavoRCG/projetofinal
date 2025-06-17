import express from "express";
import { loginUser } from "../controllers/loginController";
/*import { authMiddleware } from "../middlewere/authMiddleware";*/

const router = express.Router();

router.post("/login", loginUser);

export default router;
