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

addGoal(Author) {
    var entry = {
    Author: Author
    
    /*published: new Date().toISOString().split('T')[0]*/
    }
    
    this.db.insert(entry, function(err, doc) {
    if (err) {
    console.log('Error inserting document', subject);
    } else {
    console.log('document inserted into the database', doc);
    }
    })
    } 

}
module.exports = Planner;
