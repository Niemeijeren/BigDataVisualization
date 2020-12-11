var express = require('express');
const app = express()
const port = 3000

var mostActiveHeadOfState;
var langCount;
var countryCount;
// MongoDB setup
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb+srv://InterCare:Julian123@intercarebachelor.lctyd.azure.mongodb.net/BigData?retryWrites=true&w=majority";

var usRelative;
var ukRelative;
var brasilRelative;
var indiaRelative;
var turkeyRelative;
var indonesiaRelative;
var mexicoRelative;
var deutschlandRelative;
var canadaRelative;
var espanaRelative;


	
    // MongoDB connect to database.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BigData");
        // Get lang and count.
        dbo.collection("CountryCount").find({}).toArray(function(err, result) {
        if(err) throw err;
        result[0].count 
        langCount = result.slice(0,10);
        db.close();
        });
    });

    // MongoDB connect to database for new session.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
      if (err) throw err;
      var dbo = db.db("BigData");
      // Get Most active screen_name. It takes a moment to retrieve it.
      dbo.collection("Locations").find({}).toArray(function(err, result2) {
        if(err) throw err;
        countryCount = result2.slice(0,10);
        usRelative = (result2[0].count / 330695400)
        ukRelative = result2[1].count / 66650000
        brasilRelative = result2[2].count / 209500000
        indiaRelative = result2[3].count / 1380004385
        turkeyRelative = result2[4].count / 84733150
        indonesiaRelative = result2[5].count / 274795584
        mexicoRelative = result2[5].count  / 129528514
        deutschlandRelative = result2[5].count / 83902518
        canadaRelative = result2[6].count / 37887917
        espanaRelative = result2[6].count / 46762763
        db.close();
      });
  });



    // MongoDB connect to database for new session.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("BigData");
        // Get Most active screen_name. It takes a moment to retrieve it.
        dbo.collection("MostActiveHeadOfState").find({}).toArray(function(err, result3) {
          if(err) throw err;
          mostActiveHeadOfState = result3.slice(0,5);
          db.close();
        });
    });
  
    
  


app.get('/getMostActiveHeadOfState', function(req, res) {
  res.send(mostActiveHeadOfState);
})

app.get('/getLanguageCount', function(req, res) {
  res.send(langCount);
});

app.get('/getCountryCount', function(req, res) {
  res.send(countryCount);
})

app.get('/getCountryCountRelative', function(req, res) {
  
  // We send the updated array with the js objects.
  res.send([
    {"country": "United States", "count": usRelative}, 
    {"country": "United Kingdom", "count": ukRelative},
    {"country": "Brasil", "count": brasilRelative},
    {"country": "India", "count": indiaRelative},
    {"country": "Türkiye", "count": turkeyRelative},
    {"country": "Indonesia", "count": indonesiaRelative},
    {"country": "México", "count": mexicoRelative},
    {"country": "Deutschland", "count": deutschlandRelative},
    {"country": "Canada", "count": canadaRelative},
    {"country": "España", "count": espanaRelative},
  ]);
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(express.static('js'))
