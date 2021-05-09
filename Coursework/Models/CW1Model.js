const nedb = require('nedb');

class Planner{

//constructor for the Planner class (instantiates the database and will automatically load or generate the appropriate file)
constructor(dbFilePath){
    
    if(dbFilePath){
        this.db = new nedb({filename: dbFilePath, autoload: true});
        console.log('DB connected to:' + dbFilePath);

    } else{
        this.db = new nedb();
        console.log('DB connected in memory');
    }

   

}



init(){
     
}

//used in the landing page to render all of the entries in the database file
getAllEntries(user){
    return new Promise((resolve, reject) => {
    this.db.find({Author: user}, function(err, entries){
        if(err){
                reject(err);
                console.log('Promise in getAllEntries rejected');
        }else{
                resolve(entries);
                console.log('promise in getAllEntries resolved', entries);
        }
    })
})
}

//used in the add goal page to add the listed key pairs to the database file when requested
addGoal(Author, training_week, goal_start_date, goal, goal_progress,  goal_completion_date, all_goal_completion, _id) {
    var entry = {
    Author: Author,
    training_week: training_week,
    goal_start_date: goal_start_date,
    goal: goal,
    goal_progress: goal_progress,
    goal_completion_date: goal_completion_date,
    all_goal_completion: all_goal_completion,
    _id : _id,
    published: new Date().toISOString().split('T')[0]
    }
    
    this.db.insert(entry, function(err, doc) {
    if (err) {
    console.log('Error inserting document');
    } else {
    console.log('document inserted into the database', doc);
    }
    })
    } 

   

//used on the landing page and its variations to filter goals by their completion status
        getEntriesProgress(all_goal_completion, Author, training_week) {
            return new Promise((resolve, reject) => {
            this.db.find({ 'all_goal_completion': all_goal_completion, Author: Author, training_week: training_week }, function(err, entries) {
            if (err) {
            reject(err);
            } else {
            resolve(entries);
            console.log('getEntriesProgress returns: ', entries);
            }
            })
            })
            } 
//Used on the filter by trainig week page to filter the database entries by the training_week field to show goals for a certain week
            getTrainingWeek(training_week, username_selected) {
                return new Promise((resolve, reject) => {
                this.db.find({ training_week: training_week, "Author" : username_selected }, function(err, entries) {
                if (err) {
                reject(err);
                } else {
                resolve(entries);
                console.log('trainingWeek returns: ', entries);
                }
                })
                })
                } 





//used on the landing page and its variations to delete entries(goals) by clicking the trash icon
        deleteEntry(id) {
            this.db.remove({_id: id}, {}, function(err, rem) {
            if (err) {
            console.log('error in deleteEntry', err);
            } else {
            console.log(rem, 'entries deleted');
            }
            })
            } 


//code created with https://github.com/louischatriot/nedb the nedb documentation from this link as a source          
editMethod(_id,parameter, new_val){

    if (parameter == "training_week"){
        this.db.update({_id: _id}, {$set: {training_week: new_val}}, {multi: false}, function(err){});
        }else if (parameter == "Author"){
            this.db.update({_id: _id}, {$set: {Author: new_val}}, {multi: true}, function(err){});
        }else if (parameter == "goal_start_date"){
            this.db.update({_id: _id}, {$set: {goal_start_date: new_val}}, {multi: true}, function(err){});
        }else if (parameter == "goal"){
            this.db.update({_id: _id}, {$set: {goal: new_val}}, {multi: true}, function(err){});
        }else if (parameter == "goal_progress"){
            this.db.update({_id: _id}, {$set: {goal_progress: new_val}}, {multi: true}, function(err){});
        }else if (parameter == "goal_completion_date"){
            this.db.update({_id: _id}, {$set: {goal_completion_date: new_val}}, {multi: true}, function(err){});
        }else if (parameter == "all_goal_completion"){
            this.db.update({_id: _id}, {$set: {all_goal_completion: new_val}}, {multi: true}, function(err){});
}

}






}
module.exports = Planner;
