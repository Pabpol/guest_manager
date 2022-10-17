const express = require('express');
const router = express.Router();
const guestService = require('../service/guestService')

router.post("/",async (req, res) => {
    try {
      if ( guestService.addGuest(req.body)) {
        res.status(200)
        res.redirect('/confirmado');
        res.end();
      }else{
        res.status(200)
        res.redirect('/ya-confirmado');
        res.end();
      }
      } catch (error) {
      console.log(error)
      res.statusCode = 500;
      res.statusMessage = "Error al confirmar";
      res.redirect('/error');
      res.end();
      
    }
  });

  module.exports = router;
