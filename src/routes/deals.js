const express = require('express');

const { 
    createDeal,
    getDealsById,
    deleteDeal,
    updateDeal,
} = require('../controllers/deals');
const router = express.Router();

router.get('/:id', getDealsById);
router.post('/', createDeal);
router.put('/:id',updateDeal)
router.delete('/:id', deleteDeal);

module.exports = router;