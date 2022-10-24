const guestRespository = require("../repository/GuestRespository");
const { send } = require("./sendMail");


module.exports = {
  addGuest: async(guest) => {
    console.log(guest);
    try {
      if (guest.mail === "") {
        throw error;
      }
      if (!guestRespository.get(guest.mail)) {
        guestRespository.add(guest);
        await send(guest.mail);
        return true;
      }else{
        return false;
      }
    } catch (error) {
      throw error
    }
  },
};
