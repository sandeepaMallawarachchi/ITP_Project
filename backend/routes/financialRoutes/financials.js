const express = require('express');
const router = express.Router();
const financial = require('../../models/financialModels/financial');
let teaPack = require("../../models/staffModels/salaryDetails");
const Salary = require('../../models/staffModels/salaryDetails');

router.post("/add/:id", async (req, res) => {
    const { category, description } = req.body;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0); 

    try {
        // Retrieve standard price based on the tea type selected
        const priceDocument = await salaryDetails.findOne({ category: Salary });

        if (!priceDocument) {
            throw new Error("categorynot found");
        }

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