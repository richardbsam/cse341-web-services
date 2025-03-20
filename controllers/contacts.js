const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
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
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};


// Delete contact
const deleteContact = async (req, res) => {
  //#swagger.tags=['contacts']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};












/*

// Get all contact
const getAll = async (req, res) => {
  //#swagger.tags=['contacts']
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
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
const createContacts = async (req, res) => {
   //#swagger.tags=['contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.Error || 'some errors occurr while creating contact');
  }
};

// Update contact
const updateContacts = async (req, res) => {
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
  if (response.modifiedCount > 0) { 
    res.status(204).send();
  } else {
    res.status(500).json(response.Error || 'some errors occurr while updating contact');
  }
};
 
// Delete contact
const deleteContacts = async (req, res) => {
  //#swagger.tags=['contacts']
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.Error || 'some errors occurr while deleting contact');
  }
};

*/