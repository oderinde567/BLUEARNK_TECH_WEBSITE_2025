const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serve frontend files

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Message Schema
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// API endpoint to save contact messages
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    if(!name || !email || !message) {
        return res.status(400).json({ msg: "Please fill all fields" });
    }
    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ msg: "Message sent successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
