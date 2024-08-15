import express from "express";
import cors from "cors";
import sequelize from "./db/index.js";
import cardRouter from "./routes/flipcard.route.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/users", userRouter);
app.use("/api/cards", cardRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hell yeah" });
});

// Start the server after syncing the database
async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing the database:", error);
    process.exit(1);
  }
}

startServer();
