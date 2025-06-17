import express from "express";
import {
  getAll,
  getCorteById,
  createCorte,
  updateCorte,
  deleteCorteById,
} from "../controllers/cortesController";
import { authMiddleware } from "../middlewere/authMiddleware";

const router = express.Router();

router.get("/cortes", getAll);
router.get("/cortes/:id", getCorteById);
router.post("/cortes", authMiddleware, createCorte);
router.put("/cortes/:id", authMiddleware, updateCorte);
router.delete("/cortes/:id", authMiddleware, deleteCorteById);

export default router;
