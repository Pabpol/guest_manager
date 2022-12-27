const { Guest } = require('../models');

module.exports = {
    add: async (guest) =>{
        Guest.create(guest)
    },
    get: async (mail) =>{
        Guest.findOne({where: {mail: mail}})
    },
    getAll: async () =>{
        return await Guest.findAll({
            attributes: ["nombre",
            "apellido",
            "menu",
            "nombreAcompnanante",
            "apellidoAcompanante",
            "menuAcompanante"
        ]
        });
    }
}

