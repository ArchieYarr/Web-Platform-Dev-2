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
    this.db.insert({
        Training_day: "Friday",
        Training_excercise: "weights",
        Training_duration: "1 hour",
        Training_week: "1",
        Training_date: "02/01/21",
        ID: "01"
    })
    console.log('db entry for ID 01 added');

    this.db.insert({
        Training_day: "Saturday",
        Training_excercise: "Running",
        Training_duration: "1 hour",
        Training_week: "1",
        Training_date: "03/01/21",
        ID: "02"
    })
    console.log('db entry for ID 02 added');

    this.db.insert({
        Training_day: "Sunday",
        Training_excercise: "Skipping",
        Training_duration: "1 hour",
        Training_week: "1",
        Training_date: "04/01/21",
        ID: "03"
    })
    console.log('db entry for ID 03 added');

    this.db.insert({
        Username: "username",
        Password: "password"
    })
    console.log('db entry for Login added');
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


}
module.exports = Planner;
