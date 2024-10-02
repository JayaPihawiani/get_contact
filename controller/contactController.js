const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactSchema");
const express = require("express");

const getRouter = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ userID: req.user.id });
  res.status(200).json(contact);
});

const postRouter = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const createContact = await Contact.create({
      name,
      email,
      phone,
      userID: req.user.id,
    });
    res.status(201).json(createContact);
  } else {
    res.status(400);
    throw new Error("All fields cannot be empty");
  }
});

const updateRouter = asyncHandler(async (req, res) => {
  const contactID = await Contact.findById(req.params.id);
  if (!contactID) {
    res.status(404);
    throw new Error("Cannot find contact by this ID");
  }
  if (contactID.userID.toString() === req.user.id) {
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateContact);
  } else {
    res.status(403);
    throw new Error("Cannot update contact by this ID");
  }
});

const deleteRouter = asyncHandler(async (req, res) => {
  const contactID = await Contact.findById(req.params.id);
  if (!contactID) {
    res.status(404);
    throw new Error("Cannot find contact by this ID");
  }
  if (contactID.userID.toString() === req.user.id) {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contactID);
  } else {
    res.status(403);
    throw new Error("Cannot delete contact by this ID");
  }
});

const getUserRouter = asyncHandler(async (req, res) => {
  const contactID = await Contact.findById(req.params.id);
  if (!contactID) {
    res.status(404);
    throw new Error("Cannot find contact by this ID");
  }
  if (contactID.userID.toString() === req.user.id) {
    res.status(200).json(contactID);
  } else {
    res.status(403);
    throw new Error("Cannot fetch data contact by this ID");
  }
});

module.exports = {
  getRouter,
  postRouter,
  updateRouter,
  deleteRouter,
  getUserRouter,
};
