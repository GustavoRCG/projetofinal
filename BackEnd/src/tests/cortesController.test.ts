import request from "supertest";
import express from "express";
import {
  getAll,
  getCorteById,
  createCorte,
  updateCorte,
  deleteCorteById,
} from "../controllers/cortesController";
import CortesModel from "../models/CortesModel";

const app = express();
app.use(express.json()); // Analisar o corpo das requisições JSON

app.get("/api/cortes", getAll);
app.get("/api/cortes/:id", getCorteById);
app.post("/api/cortes", createCorte);
app.put("/api/cortes/:id", updateCorte);
app.delete("/api/cortes/:id", deleteCorteById);

// Mock do CortesModel
jest.mock("../models/CortesModel");

describe("Cortes API", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it("should get all cortes", async () => {
    (CortesModel.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: "Corte 1" },
    ]);

    const response = await request(app).get("/api/cortes");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "Corte 1" }]);
  });

  it("should get a corte by ID", async () => {
    (CortesModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Corte 1",
    });

    const response = await request(app).get("/api/cortes/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Corte 1" });
  });

  it("should create a new corte", async () => {
    (CortesModel.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Corte 1",
      preco: 100,
      descricao: "Descrição do corte",
    });

    const response = await request(app).post("/api/cortes").send({
      name: "Corte 1",
      preco: 100,
      descricao: "Descrição do corte",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Corte 1",
      preco: 100,
      descricao: "Descrição do corte",
    });
  });

  it("should return 400 for missing name", async () => {
    const response = await request(app).post("/api/cortes").send({
      preco: 100,
      descricao: "Descrição do corte",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Name is required" });
  });

  it("should update a corte", async () => {
    (CortesModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Corte 1",
      preco: 100,
      descricao: "Descrição do corte",
      save: jest.fn(),
    });

    const response = await request(app).put("/api/cortes/1").send({
      name: "Corte Atualizado",
      preco: 150,
      descricao: "Nova descrição",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Corte Atualizado",
      preco: 150,
      descricao: "Nova descrição",
    });
  });

  it("should return 404 for corte not found on update", async () => {
    (CortesModel.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put("/api/cortes/1").send({
      name: "Corte Atualizado",
      preco: 150,
      descricao: "Nova descrição",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Corte not found" });
  });

  it("should delete a corte", async () => {
    (CortesModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Corte 1",
      destroy: jest.fn(),
    });

    const response = await request(app).delete("/api/cortes/1");
    expect(response.status).toBe(204);
  });

  it("should return 404 for user not found on delete", async () => {
    (CortesModel.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/api/cortes/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Corte not found" });
  });
});
