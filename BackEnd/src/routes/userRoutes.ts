import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from "../controllers/userController";
import { authMiddleware } from "../middlewere/authMiddleware";

const router = express.Router();
//rota publica
router.post("/users", createUser);

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUserById);

export default router;
