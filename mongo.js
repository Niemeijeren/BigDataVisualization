var express = require('express');
const app = express()
const port = 3000

var mostActiveHeadOfState;
var langCount;
var countryAndName;
// MongoDB setup
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb+srv://InterCare:Julian123@intercarebachelor.lctyd.azure.mongodb.net/BigData?retryWrites=true&w=majority";

	
    // MongoDB connect to database.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BigData");
        // Get lang and count.
        dbo.collection("CountryCount").find({}).toArray(function(err, result) {
        if(err) throw err;
        langCount = result.slice(0,15);
        db.close();
        });

    });



    // MongoDB connect to database for new session.
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
	


app.get('/getMostActiveHeadOfState', function(req, res) {
  res.send(mostActiveHeadOfState);
})

app.get('/getLanguageCount', function(req, res) {
  res.send(langCount);
});

app.get('/getCountryAndName', function(req, res) {
  res.send(countryAndName);
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(express.static('js'))
