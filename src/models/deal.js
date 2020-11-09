const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema(
  {   
    name: {
      type: String,
      required: true,
    },

    stage:{
        type: String,
        required:true,
    },

    amount:{
        type: Number,
        required:true,
    },

    dealType:{
        type:String,
        required: false,
    },

    closeDate: {
        type: String,
        required: true,
    },

    products: {
        type:Object,
        required:true,
    },

    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],

    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },

    dealOwner:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model('Deal', dealSchema);

module.exports = Model;

