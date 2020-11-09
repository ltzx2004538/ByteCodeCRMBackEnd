const express = require('express');


const {
       addCompany, 
       getCompanyByCode, 
       getAllCompanies, 
       updateCompany, 
       deleteCompany,
       addContactToCompany,
       removeContactFromCompany,
       searchCompanyByUserId,
       multiRefChange,
    } = require('../controllers/companies');//导入功能

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:code', getCompanyByCode);
router.post('/', addCompany);
router.put('/:code',updateCompany);
router.delete('/:code', deleteCompany); 
router.get('/search/:userId/:keywords', searchCompanyByUserId);
router.post('/:code/contacts/:id', addContactToCompany);
router.delete('/:code/contacts/:id', removeContactFromCompany);
router.put('/:code/ref',multiRefChange);


module.exports = router;