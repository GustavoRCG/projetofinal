import request from "supertest";
import express from "express";
import { loginUser } from "../controllers/loginController";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

const app = express();
app.use(express.json()); // Para analisar o corpo das requisições JSON

// Definindo a rota para o login
app.post("/api/login", loginUser);

// Mock do UserModel e do generateToken
jest.mock("../models/UserModel");
jest.mock("../utils/jwt");

describe("User  Login API", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Email and password are required" });
  });

  it("should return 400 if email is not found", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post("/api/login")
      .send({ email: "notfound@example.com", password: "Password123!" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid email or password" });
  });

  it("should return 400 if password is invalid", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue({
      checkPassword: jest.fn().mockResolvedValue(false),
    });

    const response = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "WrongPassword" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid email or password" });
  });

  it("should return 200 and a token on successful login", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      checkPassword: jest.fn().mockResolvedValue(true),
    };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue("mockedToken");

    const response = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "Password123!" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login successful",
      token: "mockedToken",
    });
  });
});
