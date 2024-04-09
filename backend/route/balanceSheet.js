const router=require ("express").Router();
const Balance = require("../model/balance");

// Route to create a new balance
router.post('/balances', async (req, res) => {
    try {
        const { liabilities, qualities, description, amount } = req.body;
        const newBalance = new Balance({ liabilities, qualities, description, amount });
        await newBalance.save();
        res.status(201).json({ message: 'Balance created successfully', balance: newBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get all balances
router.get('/balances', async (req, res) => {
    try {
        const balances = await Balance.find();
        res.status(200).json(balances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a balance by ID
router.put('/balances/:id', async (req, res) => {
    try {
        const { liabilities, qualities, description, amount } = req.body;
        const updatedBalance = await Balance.findByIdAndUpdate(req.params.id, { liabilities, qualities, description, amount }, { new: true });
        if (!updatedBalance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json({ message: 'Balance updated successfully', balance: updatedBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a balance by ID
router.delete('/balances/:id', async (req, res) => {
    try {
        const deletedBalance = await Balance.findByIdAndDelete(req.params.id);
        if (!deletedBalance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json({ message: 'Balance deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get a balance by ID
router.get('/balances/:id', async (req, res) => {
    try {
        const balance = await Balance.findById(req.params.id);
        if (!balance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json(balance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
