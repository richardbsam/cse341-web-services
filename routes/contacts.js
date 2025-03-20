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
