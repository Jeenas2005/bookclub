const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/stationeryOrders', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to stationeryOrders database'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Order Schema
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    customMsg: String,
    deliveryDate: String,
    payment: String,
    items: [{
        item: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    previousOrderId: String, // Track previous order version if applicable
});

// Create Order model
const Order = mongoose.model('Order', orderSchema);

// Handle POST request to place a new order
app.post('/orders', async(req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.json({ message: 'Order placed successfully!' });
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ message: 'Failed to place order' });
    }
});

// Handle PUT request to update an existing order (this is replaced by creating a new version)
app.put('/orders/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: 'Order updated successfully!', order: updatedOrder });
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Failed to update order' });
    }
});

// Handle DELETE request to delete an order
app.delete('/orders/:id', async(req, res) => {
    const { id } = req.params;
    try {
        await Order.findByIdAndDelete(id);
        res.json({ message: 'Order deleted successfully!' });
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ message: 'Failed to delete order' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`shopOrderServer running on port ${PORT}`);
});