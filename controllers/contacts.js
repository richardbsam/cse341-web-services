const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });

};


// Wrong Code? //

/*
const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
}
*/


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
    res.status(500).json({ 
      message: 'Error fetching contact', 
      error: error.message || 'An unknown error occurred' 
    });
  }
};


  //
//contact part 2
const createContacts = async (req, res) => {
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

const updateContacts = async (req, res) => {
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

const deleteContacts = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db().collection('contacts').remove({ _id: contactId }, true);
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