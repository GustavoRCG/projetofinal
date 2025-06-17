import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;
      login(token);
      navigate("/home");
      location.reload();
    } catch (error) {
      console.error(error);
      alert("Error, Email or Password incorrect.");
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
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "300px",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Login</h2>
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
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "A senha é obrigatória",
              minLength: {
                value: 8,
                message: "A senha deve ter no mínimo 8 caracteres",
              },
              validate: (value) =>
                /[A-Z]/.test(value) ||
                "A senha deve conter pelo menos uma letra maiúscula",
            })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Entrar
        </button>

        <div style={{ paddingTop: "20px" }}>
          <Link
            to={"/cadastro"}
            style={{ textDecoration: "none", color: "black" }}
          >
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
