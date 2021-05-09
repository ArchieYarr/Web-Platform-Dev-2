
const plannerDAO = require('../Models/CW1Model'); 
const db = new plannerDAO('dbFilePath.db');

const UserDAO = require('../Models/userModel'); 

db.init();

//instructions for how to respond to a landing page request (references model)
exports.landing_page = function(req, res) {
    
    res.render('user/login'); 
    } 

//instructions for how to respond to an add page request (renders the addEntries page, ensuring that a user is logged in)
exports.add = function(req, res){
    res.render('addEntries', {
        'title': 'addEntries',
        'user': req.user.user
});
}

//instructions for how to respond to an edit page request (renders the editEntries page)
exports.edit = function(req, res){
    res.render('editEntries', {
        'title': 'Edit Goal by Goal ID',
        
});


}

exports.post_edit = function(req, res){

db.editMethod(req.body._id, req.body.parameter, req.body.new_val)
res.redirect("/planner");
}

//instructions for how to respond to a sortWeek page request (renders the sortWeek page)
exports.sortWeek = function(req, res){
    res.render('sortWeek', {
        'title': 'Sort by Week',
        "user": req.user.user
        
});
}

//instructions for how to respond to an addGoal request (references the addGoal method in the model and redirects to the landing page on completion)
exports.post_new_entry = function(req, res) {
    
    
    db.addGoal(req.body.Author, req.body.training_week, req.body.goal_start_date, req.body.goal, req.body.goal_progress,  req.body.goal_completion_date, req.body.all_goal_completion, req.body._id, req.body.published);
    res.redirect('/planner');
   } 

  
//instructions for how to respond to a filter request (references the getEntriesProgress method in the model and renders the planner with the new filter applied)
    exports.show_user_completion = function(req, res)
   {
       console.log('filtering by goal completion', req.params.all_goal_completion); 
       console.log('filtering by goal completion', req.params.Author); 
       console.log('filtering by goal completion', req.params.training_week); 
       
       db.getEntriesProgress(req.params.all_goal_completion, req.params.Author, req.params.training_week).then((entries) => {
       res.render('planner', {
       'title': 'Filtered Goal Progress',
       
       'entries': entries
       });
       }).catch((err) => {
       console.log('error handling author posts', err);
       }); 
    
    
    }

    //instructions for how to respond to a 'sort by week' request (references getTrainingWeek in the model and shows the landing page with only goals from a certain week)
    exports.show_training_week = function(req, res)
    {
        console.log('filtering by week', req.body.training_week); 
        console.log('filtering user' , req.body.username_selected);
        
        db.getTrainingWeek(req.body.training_week, req.body.username_selected).then((entries) => {
        res.render('SortedPlanner', {
        'title': 'Filtered Weeks',
        
        'entries': entries
        });
        }).catch((err) => {
        console.log('error handling author posts', err);
        }); 
     
     
     }


//instructions on how to deal with a delete request when the trash icon is selected (references the deleteEntry method in the model)
    exports.delete_entry = function(req, res) {
        console.log('id in delete_entry', req.params.id);
        res.redirect('/planner');
        db.deleteEntry(req.params.id); 
        }

//below are callbacks for the registration and login process

exports.login = function(req, res){
    
       res.render('user/login'); 
          
}

exports.post_login = function(req, res) {
    res.redirect('/planner');
   }; 
exports.render_planner = function(req, res){
    console.log('passed username is', req.user.user);
    db.getAllEntries(req.user.user).then((entries)=> {
        res.render('planner', {
            'user': req.user.user,
            'title':'s Activity Planner',
            
            'entries': entries
        });
    })
}


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

//callback for the shareable link

exports.shareable_link = function(req, res) {
    db.getEntriesByFilter(req.query.user, req.query.training_week).then((entries)=> {
        res.render('SharedPlanner', {
            'user': req.query.user,
            'title':'s Activity Planner',
            
            'entries': entries
        });
    })

}