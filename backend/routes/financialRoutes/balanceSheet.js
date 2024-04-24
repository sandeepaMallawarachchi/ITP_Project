const router = require("express").Router();
const express = require('express');
const libilities = require("../../models/financialModels/libilities");
const ex = require('../../models/financialModels/financial');
const Sales = require('../../models/salesModels/salesDetails');

// Route to create a new libilities
router.post('/addbalances', async (req, res) => {

    const { liabilities, description, amount } = req.body;

    try {
        const newBalance = new libilities({
            liabilities,
            description,
            amount
        });
        newBalance.save();
        res.status(201).json({ message: 'Balance created successfully', liabilities: newBalance });
    } catch (error) {
        console.error('Error adding liabilities:', error);
        res.status(500).json({ error: 'Error adding liabilities' });
    }
});

// Route to get all liabilities
router.get('/balances', async (req, res) => {
    try {
        const balances = await libilities.find();
        res.status(200).json(balances);
    } catch (error) {
        console.error('Error getting balances:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a libilities by ID
router.put('/balances/:id', async (req, res) => {
    try {
        const { liabilities, description, amount } = req.body;
        const updatedBalance = await libilities.findByIdAndUpdate(req.params.id, { liabilities, description, amount }, { new: true });
        if (!updatedBalance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json({ message: 'Balance updated successfully', libilities: updatedBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a libilities by ID
router.delete('/balances/:id', async (req, res) => {
    try {
        const deletedBalance = await libilities.findByIdAndDelete(req.params.id);
        if (!deletedBalance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json({ message: 'Balance deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a libilities by ID
router.get('/balances/:id', async (req, res) => {
    try {
        const balance = await libilities.findById(req.params.id);
        if (!balance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json(balance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to calculate the total liabilities
router.get('/totalLiabilities', async (req, res) => {
    try {
        const totalLiabilities = await libilities.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        if (totalLiabilities.length === 0) {
            return res.status(404).json({ message: 'No liabilities found' });
        }
        res.status(200).json({ totalLiabilities: totalLiabilities[0].total });
    } catch (error) {
        console.error('Error calculating total liabilities:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to calculate total balance
router.get('/totalBalance', async (req, res) => {
    try {
        // Calculate total liabilities
        const totalLiabilities = await libilities.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        const liabilitiesAmount = totalLiabilities.length > 0 ? totalLiabilities[0].total : 0;

        // Calculate total expenses
        const totalExpensesResult = await ex.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
        const totalExpenses = totalExpensesResult.length > 0 ? totalExpensesResult[0].total : 0;

        // Calculate total sales
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

        const totalSalesResult = await Sales.aggregate([
            {
                $match: {
                    date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            }
        ]);

        const totalSales = totalSalesResult.length > 0 ? totalSalesResult[0].totalSales : 0;

        // Calculate total balance
        const totalBalance = totalSales - (liabilitiesAmount + totalExpenses);

        res.status(200).json({ totalBalance });

    } catch (error) {
        console.error('Error calculating total balance:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});





module.exports = router;