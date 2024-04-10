const express = require('express');
const router = express.Router();
const financial = require('../models/financialModels/financial');

router.post("/add", async (req, res) => {
    const { date, category, description, amount } = req.body;

    try {
        const newExpense = new financial({ date, category, description, amount });
        await newExpense.save();
        res.json("Expense Added");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/display", async (req, res) => {
    try {
        const expenses = await financial.find();
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

router.put("/update/:id", async (req, res) => {
    const { date, category, description, amount } = req.body;
    const updateExpenses = { date, category, description, amount };

    try {
        const updated = await financial.findByIdAndUpdate(req.params.id, updateExpenses);
        if (!updated) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ status: "Expense updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const deleted = await financial.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ status: "Expense deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const expense = await financial.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.status(200).json({ status: "Expense fetched", expense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;