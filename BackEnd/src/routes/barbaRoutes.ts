import express from "express";
import {
  getAll,
  getBarbaById,
  createBarba,
  updateBarba,
  deleteBarbaById,
} from "../controllers/barbaController";
import { authMiddleware } from "../middlewere/authMiddleware";

const router = express.Router();

router.get("/barba", getAll);
router.get("/barba/:id", getBarbaById);
router.post("/barba", authMiddleware, createBarba);
router.put("/barba/:id", authMiddleware, updateBarba);
router.delete("/barba/:id", authMiddleware, deleteBarbaById);

export default router;
