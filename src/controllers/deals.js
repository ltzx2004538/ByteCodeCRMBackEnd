const Contact = require('../models/contact');
const User = require('../models/user');
const Deal = require('../models/deal');
const Company = require('../models/company');
const { checkDuplicateItem } = require('../utils/sortArray');

async function createDeal(req, res) {
    const { name, stage, amount, closeDate, dealOwner, dealType, company, contacts, products } = req.body;
    const user = await User.findById(dealOwner.id).exec();
    if(isNaN(amount)){
        const error = {error:'Amount must be a number'};
        return res.status(400).json(error);
    }
    const deal = new Deal({
        name, stage, amount, closeDate, dealType, products
    });
    const findCompany = await Company.findById(company.id).exec();
    if (findCompany) {
        console.log("find company" + findCompany.id);
        deal.company = findCompany.id;
        findCompany.deals.addToSet(deal.id);
        findCompany.save();
    }
    deal.dealOwner = user;
    for (let i in contacts) {
        addContacts(contacts[i].id, deal._id);
        deal.contacts.addToSet(contacts[i].id);
    }
    await deal.save();
    const resDeal = await Deal.findOne({ _id: deal._id })
        .populate('contacts', 'firstName lastName email')
        .populate('dealOwner', 'firstName lastName fullName')
        .populate('company', 'name companyDomain')
        .exec();
    return res.status(200).json(resDeal);
};

async function updateDeal(req, res) {
    const { id } = req.params;
    const {  name, stage, amount, closeDate, dealType, products } = req.body;
    const newDeal = await Deal.findByIdAndUpdate(
        id,
        { name, stage, amount, closeDate, dealType, products },
    ).exec();
    if (!newDeal) {
        return res.status(404).json('Deal not found');
    }
    return res.status(200).json(newDeal);
}

async function getDealsById(req, res) {
    const { id } = req.params;
    deals = await Deal.find({ $or:[{contacts: id},{company:id}]})
        .populate('contacts', 'firstName lastName email')
        .populate('dealOwner', 'firstName lastName fullName')
        .populate('company', 'name companyDomain')
        .exec();
    if (deals.length === 0) {
        return res.status(404).json('deals not found');
    }
    deals = checkDuplicateItem(deals);
    return res.status(200).json(deals);
}

async function addContacts(contactId, dealId) {
    const contact = await Contact.findById(contactId).exec();
    if (!contact) {
        return res.status(404).json('contacts not exist');
    }
    contact.deals.addToSet(dealId);
    await contact.save();
};

async function deleteDeal(req, res) {
    const { id } = req.params;
    const deal = await Deal.findById(id).exec();
    if (!deal) {
        return res.status(404).json('deal not found');
    }
    await Contact.updateMany(
        { deals: id },
        {
            $pull: {
                deals: id
            }
        }
    ).exec();
    await Company.updateMany(
        { deals: id },
        {
            $pull: {
                deals: id
            }
        }
    ).exec();
    await Deal.findByIdAndDelete(id).exec();
    return res.status(204).json(deal);
}

module.exports = {
    createDeal,
    getDealsById,
    deleteDeal,
    updateDeal
}