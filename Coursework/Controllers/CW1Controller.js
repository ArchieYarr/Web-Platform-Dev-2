const plannerDAO = require('../Models/CW1Model'); 
const db = new plannerDAO('dbFilePath.db');
db.init();

exports.landing_page = function(req, res) {
    db.getAllEntries().then((entries)=> {
        res.render('planner', {
            'title': 'planner',
            'entries': entries
        });
    })
    } 


exports.add = function(req, res){
    res.render('addEntries', {
        'title': 'addEntries',
        
});
}

exports.edit = function(req, res){
    res.render('editEntries', {
        'title': 'editEntries',
        
});
}
exports.remove = function(req, res){
    res.render('removeEntries', {
        'title': 'removeEntries',
        
});
}
exports.login = function(req, res){
     db.getAllEntries().then((entries)=> {
        res.render('login', {
            'title': 'Login',
            'entries': entries
        });
    })
}

exports.register = function(req, res){
    res.render('register', {

        'title': 'register',
       
    });
}

exports.post_new_entry = function(req, res) {
    
    
    db.addGoal(req.body.Author, req.body.published, req.body.day_of_week, req.body.goal_start_date, req.body.first_goal, req.body.second_goal, req.body.third_goal, req.body.additional_goal, req.body.first_goal_progress, req.body.second_goal_progress, req.body.third_goal_progress, req.body.additional_goal_progress, req.body.goal_completion_date, req.body.all_goal_completion);
    res.redirect('/');
   } 

//comment