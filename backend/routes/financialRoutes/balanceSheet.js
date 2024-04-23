const router=require ("express").Router();
const libilities = require("../../models/financialModels/libilities");

// Route to create a new libilities
router.post('/balances', async (req, res) => {
    try {
        const { liabilities,description, amount } = req.body;
        const newBalance = new libilities({ liabilities,  description, amount });
        await newBalance.save();
        res.status(201).json({ message: 'Balance created successfully', libilities: newBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get all libilities
router.get('/balances', async (req, res) => {
    try {
        const balances = await libilities.find();
        res.status(200).json(balances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a libilities by ID
router.put('/balances/:id', async (req, res) => {
    try {
        const { liabilities,  description, amount } = req.body;
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



module.exports = router;