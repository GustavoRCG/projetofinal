import { Model } from "sequelize";
import sequelize from "../config/database";
import { DataTypes } from "sequelize";

class CortesModel extends Model {
  id: number | undefined;
  name: string | undefined;
  preco: number | undefined;
  descricao: string | undefined;
}

CortesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CortesModel",
    tableName: "Cortes",
  }
);

export default CortesModel;
