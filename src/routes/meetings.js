const express = require('express');

const { 
	addMeeting,
	getAllMeetings,
	getMeetings,
	updateMeeting,
	deleteMeeting,
	updateContactsFromMeeting,
	removeContactsFromMeeting,
	getMeetingsByMultiContacts,
} = require('../controllers/meetings');

const router = express.Router();


router.post('/', addMeeting);
router.get('/', getAllMeetings);
router.get('/:id',getMeetings);
router.get('/contacts/:ids',getMeetingsByMultiContacts);
router.put('/:id',updateMeeting);
router.delete('/:id',deleteMeeting);
router.put('/:meetingId/contacts/:contactId', updateContactsFromMeeting);
router.delete('/:meetingId/contacts/:contactId', removeContactsFromMeeting);

module.exports = router;
