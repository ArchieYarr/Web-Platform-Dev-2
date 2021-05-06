const express = require('express');
const controller = require('../controllers/CW1Controller.js');
const auth = require('../auth/auth');
const router = express.Router(); 
const {ensureLoggedIn} = require('connect-ensure-login'); 

router.get("/", controller.landing_page);

   module.exports = router;

router.get("/add" , ensureLoggedIn('/login'),controller.add);
router.get("/edit",controller.edit);
router.get("/sortWeek",controller.sortWeek);
router.post("/sortWeek", controller.show_training_week);
router.get("/login", controller.login);
router.post("/login", auth.authorize("/login"), controller.post_login);
router.get("/register", controller.register);
router.post('/register', controller.post_new_user); 
router.get("/logout", controller.logout); 
router.get('/progress/:all_goal_completion', controller.show_user_completion);
router.get('/add', controller.add);
router.post('/add', controller.post_new_entry); 
router.get('/delete/:id', controller.delete_entry); 