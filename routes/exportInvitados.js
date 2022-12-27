var express = require('express');
const guestService = require('../service/guestService');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  await guestService.listGuests();
  setTimeout(() => {
    res.download('invitados.xlsx');
  }, 5000);
});


module.exports = router;