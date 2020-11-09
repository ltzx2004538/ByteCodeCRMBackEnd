const express = require('express');

const {
    logEmail,
    getAllEmailLogs, 
    getEmailsByContactId,
    getEmailsByMultiContacts,
    updateContactsFromEmail,
    updateEmail,
    deleteEmail,
    removeContactsFromEmail,
} = require('../controllers/emails');

const router = express.Router();

router.get('/',  getAllEmailLogs);
router.get('/:id', getEmailsByContactId);
router.get('/contacts/:ids',getEmailsByMultiContacts);
router.post('/', logEmail);
router.put('/:id',updateEmail);
router.put('/:emailId/contacts/:contactId', updateContactsFromEmail);
router.delete('/:id', deleteEmail);
router.delete('/:emailId/contacts/:contactId', removeContactsFromEmail);

module.exports = router;
