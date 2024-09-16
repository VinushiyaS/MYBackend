const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const playerRoutes = require('./routes/player');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product')); // Ensure this route is correctly set up
app.use('/api/admin', require('./routes/admin')); // Add this line for admin routes
app.use('/api', playerRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
