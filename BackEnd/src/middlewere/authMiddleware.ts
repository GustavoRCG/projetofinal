import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Token not provided. Access denied." });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // Adiciona o usuário decodificado ao objeto de solicitação
    next();
  } catch (error) {}
};
