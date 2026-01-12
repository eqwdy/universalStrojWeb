import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  tel: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Card = sequelize.define("card", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  description: { type: DataTypes.STRING },
  types: { type: DataTypes.JSONB },
  sizes: { type: DataTypes.JSONB },
  colors: { type: DataTypes.JSONB },
});

export { User, Card };
