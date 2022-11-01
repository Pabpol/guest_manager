const guestRespository = require("../repository/GuestRespository");
const { send } = require("./sendMail");


module.exports = {
  addGuest: async(guest) => {
    console.log(guest);
    try {
      if (await guest.mail === "") {
        throw error;
      }
      if (! await guestRespository.get(guest.mail)) {
        await guestRespository.add(guest);
        await send(guest.mail);
        return true;
      }else{
        return false;
      }
    } catch (error) {
      throw new Error("El mail es un cmapo obligatorio.")
    }
  },
};
