import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isValidPassword = await user.checkPassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = generateToken(user);

  res.status(200).json({ message: "Login successful", token });
};
