const router=require ("express").Router();
const qualities = require("../../models/financialModels/qualities");

// Route to create a new libilities
router.post('/qualities', async (req, res) => {
    try {
        const { qualities,description, amount } = req.body;
        const newBalance = new qualities({ qualities,  description, amount });
        await newBalance.save();
        res.status(201).json({ message: 'Balance created successfully', qualities: newBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get all libilities
router.get('/qualities', async (req, res) => {
    try {
        const balances = await qualities.find();
        res.status(200).json(balances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a libilities by ID
router.put('/qualities/:id', async (req, res) => {
    try {
        const { qualities,  description, amount } = req.body;
        const updatedBalance = await qualities.findByIdAndUpdate(req.params.id, { qualities, description, amount }, { new: true });
        if (!updatedBalance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json({ message: 'Balance updated successfully', qualities: updatedBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a libilities by ID
router.delete('/qualities/:id', async (req, res) => {
    try {
        const deletedBalance = await qualities.findByIdAndDelete(req.params.id);
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
router.get('/qualities/:id', async (req, res) => {
    try {
        const balance = await qualities.findById(req.params.id);
        if (!balance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json(balance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create a new libilities
router.post('/libilities', async (req, res) => {
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


module.exports = router;