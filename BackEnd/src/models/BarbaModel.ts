import { Model } from "sequelize";
import sequelize from "../config/database";
import { DataTypes } from "sequelize";

class BarbaModel extends Model {
  id: number | undefined;
  name: string | undefined;
  preco: number | undefined;
  descricao: string | undefined;
}

BarbaModel.init(
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
    modelName: "BarbaModel",
    tableName: "Barba",
  }
);

export default BarbaModel;
