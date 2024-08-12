import { Router } from "express";
import { User } from "../models/user.model.js";
import { where } from "sequelize";

const router = Router();

router.post("/auth", async (req, res) => {
  const { email } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email },
    });
    if (!email) {
      res.status(401).json({
        status: 401,
        error: "Invalid request",
        message: "Email is required to login/signup",
      });
    }
    res.status(200).json({
      status: 200,
      message: "User created succesfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Server Error",
      message: error.message,
    });
  }
});

export default router;
