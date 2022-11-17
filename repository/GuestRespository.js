const { Guest } = require('../models');

module.exports = {
    add: async (guest) =>{
        Guest.create(guest)
    },
    get: async (mail) =>{
        Guest.findOne({where: {mail: mail}})
    },
    getAll: async () =>{
        Guest.findAll();
    }
}

