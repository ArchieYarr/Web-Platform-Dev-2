const express = require('express');
const controller = require('../controllers/CW1Controller.js');
const router = express.Router(); 

router.get("/", controller.landing_page);

   module.exports = router;

router.get("/add",controller.add);
router.get("/edit",controller.edit);
router.get("/remove", controller.remove);
router.get("/login", controller.login);
router.get("/register", controller.register);
