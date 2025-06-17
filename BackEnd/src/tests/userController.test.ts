import request from "supertest";
import express from "express";
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
} from "../controllers/userController";
import UserModel from "../models/UserModel";

const app = express();
app.use(express.json()); //analisar o corpo das requisições JSON

app.get("/api/users", getAll);
app.get("/api/users/:id", getUserById);
app.post("/api/users", createUser);
app.put("/api/users/:id", updateUser);
app.delete("/api/users/:id", deleteUserById);

// Mock do UserModel
jest.mock("../models/UserModel");

describe("User  API", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it("should get all users", async () => {
    (UserModel.findAll as jest.Mock).mockResolvedValue([
      { id: 1, name: "John Doe" },
    ]);

    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, name: "John Doe" }]);
  });

  it("should get a user by ID", async () => {
    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
    });

    const response = await request(app).get("/api/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "John Doe" });
  });

  it("should create a new user", async () => {
    (UserModel.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
    });

    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "Password123!",
      cpf: "12345678909",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, name: "John Doe" });
  });

  it("should return 400 for invalid email", async () => {
    const response = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "invalid-email",
      password: "Password123!",
      cpf: "12345678909",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid email format" });
  });

  it("should update a user", async () => {
    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      cpf: "12345678909",
      password: "Password123!",
      save: jest.fn(),
    });

    const response = await request(app).put("/api/users/1").send({
      name: "John Doe Updated",
      password: "NewPassword123!",
      cpf: "12345678909",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User  updated successfully" });
  });

  it("should return 404 for user not found on update", async () => {
    (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).put("/api/users/1").send({
      name: "John Doe Updated",
      password: "NewPassword123!",
      cpf: "12345678909",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User  not found" });
  });

  it("should delete a user", async () => {
    (UserModel.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      destroy: jest.fn(),
    });

    const response = await request(app).delete("/api/users/1");
    expect(response.status).toBe(204);
  });

  it("should return 404 for user not found on delete", async () => {
    (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/api/users/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" }); // Corrigido para um espaço
  });
});
