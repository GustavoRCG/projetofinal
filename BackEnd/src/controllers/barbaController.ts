import { Request, Response } from "express";
import BarbaModel from "../models/BarbaModel";

export const getAll = async (req: Request, res: Response) => {
  const users = await BarbaModel.findAll();
  res.send(users);
};

export const getBarbaById = async (
  req: Request<{ id: number }>,
  res: Response
) => {
  const barba = await BarbaModel.findByPk(req.params.id);

  return res.json(barba);
};

//criar novo tipo de barba

export const createBarba = async (req: Request, res: Response) => {
  try {
    const { name, preco, descricao } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const user = await BarbaModel.create({ name, preco, descricao });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error" + error);
  }
};

//atualizar barba
export const updateBarba = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, preco, descricao } = req.body;
    if (!name || name === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    const barba = await BarbaModel.findByPk(req.params.id);
    if (!barba) {
      return res.status(404).json({ error: "Barba not found" });
    }

    barba.name = name;
    barba.preco = preco;
    barba.descricao = descricao;

    await barba.save();
    res.status(201).json(barba);
  } catch (error) {
    res.status(500).json("Internal Server Error" + error);
  }
};

//gillete barba

export const deleteBarbaById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const barba = await BarbaModel.findByPk(req.params.id);
    if (!barba) {
      return res.status(404).json({ error: "Barba not found" });
    }

    await barba.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Internal Server Error" + error);
  }
};
