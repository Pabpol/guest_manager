const guestRespository = require("../repository/GuestRespository");

module.exports = {
  addGuest: (guest) => {
    console.log(guest);
    try {
      guestRespository.add(guest);
      return true;
    } catch (error) {
      return false;
      console.log(error);
    }
  },
};
