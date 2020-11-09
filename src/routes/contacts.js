const express = require('express');

const { 
    addContact,
    getContact,
    getAllContacts,
    updateContact,
    deleteContact,
    addCompanyToContact,
    updateUser,
    searchContactByUserId,
    removeCompanyFromContact,
} = require('../controllers/contacts');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContact);
router.get('/search/:userId/:keywords', searchContactByUserId);
router.post('/', addContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);
router.put('/:contactId/users/:userId', updateUser);
router.post('/:id/companies/:code', addCompanyToContact);
router.delete('/:id/companies/:code', removeCompanyFromContact);

module.exports = router;