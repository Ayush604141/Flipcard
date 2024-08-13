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
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: User,
        key: "email",
      },
    },
  },
  { timestamps: true }
);

export { Flipcard };
