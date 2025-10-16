const express = require('express');
const connectDB = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/index"));
app.use(require("./middleware/errorHandler").errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});