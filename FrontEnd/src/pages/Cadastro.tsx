import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { createUser, NewUserData } from "../service/api";
import { AxiosError } from "axios";

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUserData>();

  const navigate = useNavigate();

  // ...

  const onSubmit: SubmitHandler<NewUserData> = async (data) => {
    try {
      await createUser(data);
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        const responseData = error.response.data as {
          error?: string;
          details?: unknown;
        };
        console.error("Erro do backend:", responseData);
        alert(responseData.error || "Erro ao cadastrar usuário.");
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Cadastro</h2>

        <label>Nome:</label>
        <input
          {...register("name", { required: "Nome é obrigatório" })}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <label>Email:</label>
        <input
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          })}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <label>CPF:</label>
        <input
          {...register("cpf", {
            required: "CPF é obrigatório",
            pattern: {
              value: /^\d{11}$/,
              message: "CPF deve conter 11 dígitos numéricos",
            },
          })}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.cpf && <p style={{ color: "red" }}>{errors.cpf.message}</p>}

        <label>Senha:</label>
        <input
          type="password"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 8,
              message: "Senha deve ter no mínimo 8 caracteres",
            },
            validate: (value) =>
              /[A-Z]/.test(value) || "Deve conter ao menos uma letra maiúscula",
          })}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Cadastrar
        </button>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;
