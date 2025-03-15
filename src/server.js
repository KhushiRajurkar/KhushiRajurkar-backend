const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();

const app = express(); // ✅ Define app before using it

// Apply rate limiting AFTER defining app
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: "Too many requests, please try again later." }
});

app.use(limiter);  // ✅ Now app is correctly defined

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running... 🚀');
});
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
