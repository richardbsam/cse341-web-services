const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;



/*
const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');


// GET /feed/posts
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

//new adding
router.post('/', contactsController.createContacts);
router.put('/:id', contactsController.updateContacts);
router.delete('/:id', contactsController.deleteContacts);

module.exports = router;
*/