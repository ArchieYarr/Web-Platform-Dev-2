const express = require('express');
const controller = require('../controllers/CW1Controller.js');
const router = express.Router(); 

router.get("/", controller.landing_page);

   module.exports = router;

router.get("/add",controller.add);
router.get("/edit",controller.edit);
router.get("/login", controller.login);
router.get("/register", controller.register);
router.get('/posts/:Author', controller.show_user_entries);
router.get('/add', controller.add);
router.post('/add', controller.post_new_entry); 
router.get('/delete/:id', controller.delete_entry); 