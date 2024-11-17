const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST: Add a new contact
router.post("/", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET: Get all contacts
router.get("/", async (req, res) => {
    try {
        const { sortBy = "firstName", order = "asc", page = 1, limit = 10 } = req.query;
        const contacts = await Contact.find()
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Update a contact
router.put("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a contact
router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
