import { Sequelize } from "sequelize";

const sequelize = new Sequelize("barbearia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
