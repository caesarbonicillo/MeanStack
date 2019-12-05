const mongoose = require("mongoose");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
 const connectionString = "mongodb+srv://bonkai:T@mo2011!@cluster0-fxxq4.mongodb.net/test?retryWrites=true&w=majority";

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(connectionString, { dbName: "BonkaiClients", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
 const mySchema = mongoose.Schema({
        first: { type: String, required: true },
        last:String,
        phone: String,
        email: String, 
        description: String,
       }); 
       
//"inventors"- is the name of repository in itcprojects on mongoDB
//"mySchema" are the data key:value pairs
module.exports = mongoose.model('bonkaiclients', mySchema); 