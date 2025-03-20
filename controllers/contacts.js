const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all contact
const getAll = async (req, res) => {
  //#swagger.tags=['contacts']
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


// Get single contact
const getSingle = async (req, res) => {
   //#swagger.tags=['contacts']
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching contact', 
      error: error.message || 'An unknown error occurred' 
    });
  }
};


// Create contact
const createContact = async (req, res) => {
  //#swagger.tags=['contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};


// Update contact
const updateContact = async (req, res) => {
  //#swagger.tags=['contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: contactId }, contact);
  if (result.modifiedCount > 0) { 
    res.status(204).send();
  } else {
    res.status(500).json(response.Error || 'some errors occurr while updating contact');
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  //#swagger.tags=['contacts']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }

    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
