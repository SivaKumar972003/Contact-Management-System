const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const dbURI = "mongodb://127.0.0.1:27017/contactManagement";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Import Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/contacts", contactRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
