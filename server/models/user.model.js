import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  { timestamps: true }
);

export { User };
