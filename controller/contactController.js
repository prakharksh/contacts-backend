const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contacts = require("../models/contactModel");
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find();
  res.status(200).json({ result: contacts });
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  res.status(200).json({ result: contact });
});


const createOrUpdateContact = asyncHandler(async (req, res) => {
  const status = req.params.id || req.body?._id ? 200 : 201;
  const { _id, name, email, phone } = req.body;
  const filter = _id ? { _id } : {_id : new mongoose.Types.ObjectId() }; 
  const update = { name, email, phone };

  const contact = await Contacts.findOneAndUpdate(filter, update, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
  console.log(filter, update);
  res.status(status).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ result: `delete contact ${req.params.id}` });
});
module.exports = {
  getContact,
  getContactById,
  createOrUpdateContact,
  deleteContact,
};
