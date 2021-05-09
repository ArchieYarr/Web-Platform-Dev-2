//package and file imports to give routes access to information (i.e. methods in the controller and model)
const express = require('express');
const controller = require('../controllers/CW1Controller.js');
const auth = require('../auth/auth');
const router = express.Router(); 
const {ensureLoggedIn} = require('connect-ensure-login'); 

router.get("/", controller.landing_page);

   module.exports = router;
//Routes for adding, editing and sorting goals
router.get("/add" , ensureLoggedIn('/login'),controller.add);
router.get("/edit",controller.edit);
router.post('/edit', controller.post_edit);
router.get("/sortWeek", ensureLoggedIn('/login'),controller.sortWeek);
router.post("/sortWeek", ensureLoggedIn('/login'),  controller.show_training_week);
router.get('/add', controller.add);
router.post('/add', controller.post_new_entry); 
router.get('/delete/:id', controller.delete_entry); 
//Routes for logging in, registering, logging out and filtering complete, incomplete and in progress goals
router.get("/login", controller.login);
router.post("/login", auth.authorize("/login"), controller.post_login);
router.get("/planner", controller.render_planner)
router.get("/register", controller.register);
router.post('/register', controller.post_new_user); 
router.get("/logout", controller.logout); 
router.get('/progress/:all_goal_completion/:Author/:training_week', controller.show_user_completion);

//link for the sharable link
router.get("/planner/shareableLink", controller.shareable_link);