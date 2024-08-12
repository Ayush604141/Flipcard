import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";
import { User } from "./user.model.js";

const Flipcard = sequelize.define(
  "Flipcard",
  {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { timestamps: true }
);

export { Flipcard };
