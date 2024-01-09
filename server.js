const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Contact = require("./models/contactSchema")
dotenv.config();
app.use(express.json());
//connecting to database
mongoose.connect(process.env.MONGO_URI).then(console.log("database connected "));
//mthode post 
app.post("/contact",async (req, res) => {
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).json({ message: "Contact added successfully", newContact });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
//method get
app.get("/contact", async (req, res) => {
    try {
      const contact = await Contact.find();
      res.status(200).json({ message: "find all contacts", contact });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })


//method update
app.put("/contact/:id",async (req, res) => {
    try {
      const id = req.params.id
      const cont = req.body
      const updatecontact = await Contact.findByIdAndUpdate(id,cont,{ new :true})
      res.status(200).json({msg: "contact updated",updatecontact})
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
  })


//method delete
app.delete("/contact/:id",async (req, res) => {
    try {
      const id = req.params.id
      const removeContact = await Contact.findByIdAndDelete(id)
      res.status(200).json({msg: "contact deleted",removeContact})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  })
//creating server
const port = process.env.PORT;
app.listen(port, () => console.log("server running on port:", port));