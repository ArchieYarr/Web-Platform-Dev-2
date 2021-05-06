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
        res.render('user/login', {
            'title': 'Login',
            'entries': entries
        });
    })
}

exports.register = function(req, res){
    res.render('user/register', {

        'title': 'register',
       
    });
}

exports.post_new_entry = function(req, res) {
    
    
    db.addGoal(req.body.Author, req.body.published, req.body.training_week, req.body.goal_start_date, req.body.first_goal, req.body.second_goal, req.body.third_goal, req.body.additional_goal, req.body.first_goal_progress, req.body.second_goal_progress, req.body.third_goal_progress, req.body.additional_goal_progress, req.body.goal_completion_date, req.body.all_goal_completion);
    res.redirect('/');
   } 

  

    exports.show_user_completion = function(req, res)
   {
       console.log('filtering by goal completion', req.params.all_goal_completion); 
    
       let completion = req.params.all_goal_completion;
       db.getEntriesProgress(completion).then((entries) => {
       res.render('planner', {
       'title': 'Filtered Goal Progress',
       'entries': entries
       });
       }).catch((err) => {
       console.log('error handling author posts', err);
       }); 
    
    
    }
    exports.delete_entry = function(req, res) {
        console.log('id in delete_entry', req.params.id);
        res.redirect('/');
        db.deleteEntry(req.params.id); 
        } 
//comment