const Datastore = require("nedb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
 constructor(users) {
 if (users) {
 //embedded
 this.db = new Datastore({ filename: users, autoload: true });
 } else {

 //in memory
 this.db = new Datastore();
 console.log('running in memory');
 }
 }
 
 // for the demo the password is the bcrypt of the user name
 init() {
 this.db.insert({
 user: 'Peter',
 password:
'12345678'
 });
 //console.log('user record inserted in init');

 this.db.insert({
 user: 'Ann',
 password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
 });
 //console.log('user record inserted in init');
 return this;
 }
 create(username, password) {
 const that = this;
 bcrypt.hash(password, saltRounds).then(function(hash) {
 var entry = {
 user: username,
 password: hash,
 };
 console.log('user entry is: ', entry);

 that.db.insert(entry, function (err) {
 if (err) {
 console.log("Can't insert user: ", username);
 }
 });
 });
 }
 lookup(user, cb) {
 this.db.find({'user': user}, function (err, entries) {
 if (err) {
 return cb(null, null);
 } else {
 if (entries.length == 0) {
 return cb(null, null);
 }
 return cb(null, entries[0]);
 }
 });
 }
}
const dao = new UserDAO('users.db');
module.exports = dao;