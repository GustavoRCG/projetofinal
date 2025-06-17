import { Request, Response } from "express";
import CortesModel from "../models/CortesModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await CortesModel.findAll();
  res.send(users);
};

export const getCorteById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const corte = await CortesModel.findByPk(req.params.id);

  return res.json(corte);
};

//criar novo corte

export const createCorte = async (req: Request, res: Response) => {
  try {
    const { name, preco, descricao } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await CortesModel.create({ name, preco, descricao });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error" + error);
  }
};

//atualizar corte
export const updateCorte = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, preco, descricao } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const corte = await CortesModel.findByPk(req.params.id);
    if (!corte) {
      return res.status(404).json({ error: "Corte not found" });
    }

    corte.name = name;
    corte.preco = preco;
    corte.descricao = descricao;

    await corte.save();
    res.status(201).json(corte);
  } catch (error) {
    res.status(500).json("Internal Server Error" + error);
  }
};

//delete corte

export const deleteCorteById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const corte = await CortesModel.findByPk(req.params.id);
    if (!corte) {
      return res.status(404).json({ error: "Corte not found" });
    }

    await corte.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Internal Server Error" + error);
  }
};
