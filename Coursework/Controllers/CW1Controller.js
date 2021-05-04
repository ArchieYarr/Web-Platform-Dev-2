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
    
    
    db.addGoal(req.body.Author);
    res.redirect('/');
   } 

//comment