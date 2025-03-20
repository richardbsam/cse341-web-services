const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



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


module.exports = { 
  getAll, 
  getSingle,
  createContacts,
  updateContacts,
  deleteContacts
};




/*
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
};

const createContacts = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (result.acknowledged) {
      res.status(201).json({ message: 'Contact created successfully', contactId: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating contact' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
};

const updateContacts = async (req, res) => {
  try {
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
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(404).json({ message: 'No contact found to update' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
};

const deleteContacts = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'No contact found to delete' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};

module.exports = { 
  getAll, 
  getSingle,
  createContacts,
  updateContacts,
  deleteContacts
};

*/