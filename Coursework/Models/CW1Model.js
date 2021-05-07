const nedb = require('nedb');

class Planner{

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
      /*this.db.insert({
    Author: 'Author',
    training_week: 'training_week',
    goal_start_date: 'goal_start_date',
    goal: 'goal',
    goal_progress: 'goal_progress',
    goal_completion_date: 'goal_completion_date',
    all_goal_completion: 'all_goal_completion'
      });*/
}

getAllEntries(){
    return new Promise((resolve, reject) => {
    this.db.find({}, function(err, entries){
        if(err){
                reject(err);
                console.log('Promise in getAllEntries rejected');
        }else{
                resolve(entries);
                console.log('promise in getAllEntries resolved');
        }
    })
})
}

addGoal(Author, training_week, goal_start_date, goal, goal_progress,  goal_completion_date, all_goal_completion) {
    var entry = {
    Author: Author,
    training_week: training_week,
    goal_start_date: goal_start_date,
    goal: goal,
    goal_progress: goal_progress,
    goal_completion_date: goal_completion_date,
    all_goal_completion: all_goal_completion,
    published: new Date().toISOString().split('T')[0]
    }
    
    this.db.insert(entry, function(err, doc) {
    if (err) {
    console.log('Error inserting document', subject);
    } else {
    console.log('document inserted into the database', doc);
    }
    })
    } 

   


        getEntriesProgress(all_goal_completion) {
            return new Promise((resolve, reject) => {
            this.db.find({ 'all_goal_completion': all_goal_completion }, function(err, entries) {
            if (err) {
            reject(err);
            } else {
            resolve(entries);
            console.log('getEntriesProgress returns: ', entries);
            }
            })
            })
            } 

            getTrainingWeek(training_week) {
                return new Promise((resolve, reject) => {
                this.db.find({ training_week: training_week }, function(err, entries) {
                if (err) {
                reject(err);
                } else {
                resolve(entries);
                console.log('trainingWeek returns: ', entries);
                }
                })
                })
                } 






        deleteEntry(id) {
            this.db.remove({_id: id}, {}, function(err, rem) {
            if (err) {
            console.log('error in deleteEntry', err);
            } else {
            console.log(rem, 'entries deleted');
            }
            })
            } 









}
module.exports = Planner;
