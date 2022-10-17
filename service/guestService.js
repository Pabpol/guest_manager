const guestRespository = require("../repository/GuestRespository");

module.exports = {
  addGuest: (guest) => {
    console.log(guest);
    try {
      if (guestRespository.get(guest.mail)) {
        guestRespository.add(guest);
        return true;
      }else{
        return false;
      }
    } catch (error) {
      throw error
    }
  },
};
