import request from "supertest";
import express from "express";
import {
  getAll,
  getBarbaById,
  createBarba,
  updateBarba,
  deleteBarbaById,
} from "../controllers/barbaController";
import BarbaModel from "../models/BarbaModel";

const app = express();
app.use(express.json()); // Analisar o corpo das requisições JSON

app.get("/api/barbas", getAll);
app.get("/api/barbas/:id", getBarbaById);
app.post("/api/barbas", createBarba);
app.put("/api/barbas/:id", updateBarba);
app.delete("/api/barbas/:id", deleteBarbaById);

// Mock do BarbaModel
jest.mock("../models/BarbaModel");

describe("Barba API", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it("should get all barbas", async () => {
    (BarbaModel.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: "Barba 1" },
    ]);

    const response = await request(app).get("/api/barbas");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Barba 1" }]);
  });

  it("should get a barba by ID", async () => {
    (BarbaModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Barba 1",
    });

    const response = await request(app).get("/api/barbas/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Barba 1" });
  });

  it("should create a new barba", async () => {
    (BarbaModel.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Barba 1",
      preco: 100,
      descricao: "Descrição da barba",
    });

    const response = await request(app).post("/api/barbas").send({
      name: "Barba 1",
      preco: 100,
      descricao: "Descrição da barba",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Barba 1",
      preco: 100,
      descricao: "Descrição da barba",
    });
  });

  it("should return 400 for missing name", async () => {
    const response = await request(app).post("/api/barbas").send({
      preco: 100,
      descricao: "Descrição da barba",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Name is required" });
  });

  it("should update a barba", async () => {
    (BarbaModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Barba 1",
      preco: 100,
      descricao: "Descrição da barba",
      save: jest.fn(),
    });

    const response = await request(app).put("/api/barbas/1").send({
      name: "Barba Atualizada",
      preco: 150,
      descricao: "Nova descrição",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Barba Atualizada",
      preco: 150,
      descricao: "Nova descrição",
    });
  });

  it("should return 404 for barba not found on update", async () => {
    (BarbaModel.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put("/api/barbas/1").send({
      name: "Barba Atualizada",
      preco: 150,
      descricao: "Nova descrição",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Barba not found" });
  });

  it("should delete a barba", async () => {
    (BarbaModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Barba 1",
      destroy: jest.fn(),
    });

    const response = await request(app).delete("/api/barbas/1");
    expect(response.status).toBe(204);
  });

  it("should return 404 for user not found on delete", async () => {
    (BarbaModel.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/api/barbas/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Barba not found" }); // Corrigido para um espaço
  });
});
