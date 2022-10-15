const { Guest } = require('../models');

module.exports = {
    add: (guest) =>{
        Guest.create(guest)
    },
    get:(mail) =>{
        Guest.findOne({where: {mail: mail}})
    }
}

