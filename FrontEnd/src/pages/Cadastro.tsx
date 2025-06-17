import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import axios from "axios";
import api from "../service/api";

type CadastroFormInputs = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
};

const Cadastro: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CadastroFormInputs>();

  const senha = watch("senha");

  const handleRegister: SubmitHandler<CadastroFormInputs> = async (data) => {
    try {
      await api.post("/users", {
        name: data.nome,
        cpf: data.cpf,
        email: data.email,
        password: data.senha,
        admin: false,
      });
      alert("Registration completed successfully!");
      location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data.error
            .map((e: { message: string }) => e.message)
            .join(", ") || "Error registering";
        alert(errorMessage);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit(handleRegister)}
        style={{
          maxWidth: "400px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Cadastro</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            {...register("nome", { required: "O nome é obrigatório" })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.nome && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.nome.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "O email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Insira um email válido",
              },
            })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            {...register("cpf", {
              required: "O CPF é obrigatório",
              validate: (value) =>
                cpfValidator.isValid(value) || "CPF inválido",
            })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.cpf && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.cpf.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            {...register("senha", {
              required: "A senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
              validate: (value) => {
                if (!/[A-Z]/.test(value))
                  return "A senha deve conter pelo menos uma letra maiúscula";
                if (!/[a-z]/.test(value))
                  return "A senha deve conter pelo menos uma letra minúscula";
                if (!/[0-9]/.test(value))
                  return "A senha deve conter pelo menos um número";
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                  return "A senha deve conter pelo menos um caractere especial";
                return true;
              },
            })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.senha && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.senha.message}
            </p>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="confirmarSenha">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmarSenha"
            {...register("confirmarSenha", {
              required: "A confirmação de senha é obrigatória",
              validate: (value) =>
                value === senha || "As senhas não correspondem",
            })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.confirmarSenha && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.confirmarSenha.message}
            </p>
          )}
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Cadastrar
        </button>

        <div style={{ paddingTop: "20px" }}>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Já possui uma conta? Faça login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
