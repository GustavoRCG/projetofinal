import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

// Função para validar CPF
const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não é uma sequência de números iguais

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
};

// Função para validar e-mail
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para validar senha
const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Criar novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: "Values required" });
    }

    // Validação de e-mail
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validação de CPF
    if (!validateCPF(cpf)) {
      return res.status(400).json({ error: "Invalid CPF format" });
    }

    // Validação de senha
    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const user = await UserModel.create({ name, email, password, cpf });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};

// Atualizar usuário
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { name, password, cpf } = req.body; // Removido o email do destructuring

  if (!name || !password || !cpf) {
    return res.status(400).json({ error: "Values required" });
  }

  const user = await UserModel.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User  not found" });
  }

  // Validação de CPF
  if (!validateCPF(cpf)) {
    return res.status(400).json({ error: "Invalid CPF format" });
  }

  // Validação de senha
  if (!validatePassword(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  // Atualiza apenas os campos permitidos
  user.name = name;
  user.cpf = cpf;

  // Atualiza a senha apenas se uma nova senha for fornecida
  if (password) {
    user.password = password;
  }

  await user.save(); // Adicione os parênteses para chamar a função

  return res.status(200).json({ message: "User  updated successfully" });
};

//delete user

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
