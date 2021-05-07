
const plannerDAO = require('../Models/CW1Model'); 
const db = new plannerDAO('dbFilePath.db');

const UserDAO = require('../Models/userModel'); 

db.init();

exports.landing_page = function(req, res) {
    db.getAllEntries().then((entries)=> {
        res.render('planner', {
            'title': 'Activity Planner',
            'entries': entries
        });
    })
    } 


exports.add = function(req, res){
    res.render('addEntries', {
        'title': 'addEntries',
        'user': req.user
});
}

exports.edit = function(req, res){
    res.render('editEntries', {
        'title': 'editEntries',
        
});


}

exports.sortWeek = function(req, res){
    res.render('sortWeek', {
        'title': 'Sort by Week',
        
});
}

exports.remove = function(req, res){
    res.render('removeEntries', {
        'title': 'removeEntries',
        
});
}


exports.post_new_entry = function(req, res) {
    
    
    db.addGoal(req.body.Author, req.body.training_week, req.body.goal_start_date, req.body.goal, req.body.goal_progress,  req.body.goal_completion_date, req.body.all_goal_completion, req.body.published);
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

    exports.show_training_week = function(req, res)
    {
        console.log('filtering by week', req.body.training_week); 
     
        let week = req.body.training_week;
        db.getTrainingWeek(week).then((entries) => {
        res.render('planner', {
        'title': 'Filtered Weeks',
        
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
//below are callbacks for the registration and login process

exports.login = function(req, res){
    
       res.render('user/login'); 
          
}

exports.post_login = function(req, res) {
    res.redirect("/");
   }; 

exports.register = function(req, res){
   res.render('user/register', {

       'title': 'register',
      
   });
}


exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    console.log("register user", user, "password", password);
    if (!user || !password) {
    res.send(401, 'no user or no password');
    return;
    }
    UserDAO.lookup(user, function(err, u) {
    if (u) {
    res.send(401, "User exists:", user);
    return;
    }
    UserDAO.create(user, password);
    res.redirect('/login');
    });
   } 

   exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
   }; 