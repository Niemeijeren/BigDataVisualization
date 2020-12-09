var express = require('express');
var app     = express();
const port  = 3000

var langCount;
export {langCount};
// MongoDB setup
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb+srv://InterCare:Julian123@intercarebachelor.lctyd.azure.mongodb.net/BigData?retryWrites=true&w=majority";

export function GetCountryArr(){
    // MongoDB connect to database.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BigData");
        // Get lang and count.
        dbo.collection("CountryCount").find({}).toArray(function(err, result) {
        if(err) throw err;
        this.langCount = result.slice(0,15);
        db.close();
        });
    });
}

export function GetMostActive(){
    var mostActiveHeadOfState;
    // MongoDB connect to database.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BigData");
      
        // Get Most active screen_name. It takes a moment to retrieve it.
        dbo.collection("MostActiveHeadOfState").find({}).toArray(function(err, result2) {
          if(err) throw err;
          mostActiveHeadOfState = result2.slice(0,5);
          db.close();
        });
    });
    return mostActiveHeadOfState;
}

app.get('/', function(request, response) {
    response.send(langCount);
});