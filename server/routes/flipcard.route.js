import { Router } from "express";
import { Flipcard } from "../models/flipcard.model.js";

const router = Router();

// Get all flashcards for a specific user
router.get("/:id", async (req, res) => {
  try {
    const cards = await Flipcard.findAll({ where: { userId: req.params.id } });
    res.status(200).json({
      status: 200,
      message: "Flashcards fetched successfully",
      data: cards,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Server Error",
      message: "Please try again later",
    });
  }
});

// Create a new Flipcard
router.post("/new", async (req, res) => {
  try {
    const { question, answer, email } = req.body;

    if (!question || !answer || !email) {
      return res.status(400).json({
        status: 400,
        error: "Invalid request",
        message:
          "Please provide all required fields: question, answer, and email.",
      });
    }

    const newCard = await Flipcard.create({ question, answer, email });

    res.status(201).json({
      status: 201,
      message: "Flipcard created successfully",
      data: newCard,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Server Error",
      message: error.message,
    });
  }
});

// Update an existing Flipcard
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const card = await Flipcard.findByPk(id);

    if (!card) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: "Flipcard not found",
      });
    }

    card.question = question || card.question;
    card.answer = answer || card.answer;

    await card.save();

    res.status(200).json({
      status: 200,
      message: "Flipcard updated successfully",
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Server Error",
      message: error.message,
    });
  }
});

// Delete a Flipcard
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Flipcard.findByPk(id);

    if (!card) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: "Flipcard not found",
      });
    }

    await card.destroy();

    res.status(200).json({
      status: 200,
      message: "Flipcard deleted successfully",
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
