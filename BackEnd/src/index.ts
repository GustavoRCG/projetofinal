import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import cortesRoutes from "./routes/cortesRoutes";
import loginRoutes from "./routes/loginRoutes";
import barbaRoutes from "./routes/barbaRoutes";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello, World! :)");
});

app.use(cors());

app.use(express.json());
app.use(userRoutes);
app.use(cortesRoutes);
app.use(loginRoutes);
app.use(barbaRoutes);

// sync database
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Conectado ao database!");
  })
  .catch((error) => {
    console.error("Erro de conexão no database:", error);
  });

app.listen(port, () => {
  console.log("Servidor esta rodando na porta", port);
});
