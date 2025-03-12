const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });

};


const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDb().db().collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
}


module.exports = { getAll, getSingle };