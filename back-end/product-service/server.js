const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const productRoutes = require('./src/routes/productRoutes');


mongoose.connect("mongodb://mongodb:27017/products")
    .then(() => console.log("Connected to MongoDB - Product Service"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
    res.send("Product Service is running");
})

app.listen(5000, () => {
    console.log("🚀 User Service running on port 5000");
});