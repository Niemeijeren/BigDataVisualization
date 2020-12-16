var express = require('express');
const app = express()
const port = 3000

var mostActiveHeadOfState;
var langCount;
var countryCount;
var streamed_Languages;
var streamed_Locations;
// MongoDB setup
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb+srv://InterCare:Julian123@intercarebachelor.lctyd.azure.mongodb.net/BigData?retryWrites=true&w=majority";

var countryPopulationTweets = [];
var countryPopulationMap = new Map();
countryPopulationMap.set("United States", 330695400);
countryPopulationMap.set("United Kingdom", 66650000);
countryPopulationMap.set("Brasil", 209500000);
countryPopulationMap.set("India", 1380004385);
countryPopulationMap.set("Türkiye", 84733150);
countryPopulationMap.set("Indonesia", 274795584);
countryPopulationMap.set("México", 129528514);
countryPopulationMap.set("Deutschland", 83902518);
countryPopulationMap.set("Canada", 37887917);
countryPopulationMap.set("España", 46762763);
countryPopulationMap.set("France", 65339853);
countryPopulationMap.set("Nederland", 17152286);
countryPopulationMap.set("Italia", 60420872);
countryPopulationMap.set("South Africa", 59649189);
countryPopulationMap.set("Argentina", 45385180);
countryPopulationMap.set("Malaysia", 32554794);
countryPopulationMap.set("Germany", 83902518);
countryPopulationMap.set("Colombia", 51130265);
countryPopulationMap.set("Australia", 25634726);
countryPopulationMap.set("Pakistan", 222833568);


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

try {
    // MongoDB connect to database.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        var dbo = db.db("BigData");
        // Get lang and count.
        dbo.collection("CountryCount").find({}).toArray(function(err, result) {
        result[0].count 
        langCount = result.slice(0,10);
        db.close();
        });
    });

    // MongoDB connect to database for new session.
    MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
      var dbo = db.db("BigData");
      // Get Most active screen_name. It takes a moment to retrieve it.
      dbo.collection("Locations").find({}).toArray(function(err, result2) {
        countryCount = result2.slice(0,10);
        usRelative = (result2[0].count / 330695400) * 1000000
        ukRelative = (result2[1].count / 66650000) * 1000000
        brasilRelative = (result2[2].count / 209500000) * 1000000
        indiaRelative = (result2[3].count / 1380004385) * 1000000
        turkeyRelative = (result2[4].count / 84733150) * 1000000
        indonesiaRelative = (result2[5].count / 274795584) * 1000000
        mexicoRelative = (result2[5].count  / 129528514) * 1000000
        deutschlandRelative = (result2[5].count / 83902518) * 1000000
        canadaRelative = (result2[6].count / 37887917) * 1000000
        espanaRelative = (result2[6].count / 46762763) * 1000000
        db.close();
      });
  });

    // MongoDB connect to database for new session.
    setInterval(() => {
      MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        var dbo = db.db("BigData");
        // Get Most active screen_name. It takes a moment to retrieve it.
        dbo.collection("Streamed_Languages").find({}).sort({count: -1}).toArray(function(err, result3) {
          streamed_Languages = result3.splice(0, 10);
          db.close();
        });
    });
    }, 1000);

    // MongoDB connect to database for new session.
    setInterval(() => {
      MongoClient.connect(MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
        var dbo = db.db("BigData");
        // Get Most active screen_name. It takes a moment to retrieve it.
        dbo.collection("Streamed_Locations").find({}).sort({count: -1}).toArray(function(err, result4) {
          streamed_Locations = result4.splice(0, 10);
          countryPopulationTweets = [];
          for(var i=0; i<streamed_Locations.length; i++) {
            if(result4[i] != undefined || null) {
              countryPopulationTweets.push({"country": streamed_Locations[i].country, "count": (Math.round((result4[i].count / countryPopulationMap.get(streamed_Locations[i].country) * 1000000) * 100) / 100)})
            }
            
          }
          db.close();
        });
    });
    }, 1000);
  
  } catch(error) {
    console.log(error);
  }  
    
  
app.get('/getStreamedLanguages', function(req, res) {
  res.send(streamed_Languages);
})

app.get('/getStreamedLocations', function(req, res) {
  res.send(streamed_Locations);
})

app.get('/getLanguageCount', function(req, res) {
  res.send(langCount);
});

app.get('/getCountryCount', function(req, res) {
  res.send(countryCount);
})

app.get('/getStreamedLocationsRelativePopulation', function(req, res) {
  res.send(countryPopulationTweets);
})

app.get('/getCountryCountRelative', function(req, res) {
  // We send the updated array with the js objects.
  res.send([
    {"country": "United States", "count": Math.round((usRelative + Number.EPSILON) * 100) / 100}, 
    {"country": "United Kingdom", "count": Math.round((ukRelative + Number.EPSILON) * 100) / 100},
    {"country": "Brasil", "count": Math.round((brasilRelative + Number.EPSILON) * 100) / 100},
    {"country": "India", "count": Math.round((indiaRelative + Number.EPSILON) * 100) / 100},
    {"country": "Türkiye", "count": Math.round((turkeyRelative + Number.EPSILON) * 100) / 100},
    {"country": "Indonesia", "count": Math.round((indonesiaRelative + Number.EPSILON) * 100) / 100},
    {"country": "México", "count": Math.round((mexicoRelative + Number.EPSILON) * 100) / 100},
    {"country": "Deutschland", "count": Math.round((deutschlandRelative + Number.EPSILON) * 100) / 100},
    {"country": "Canada", "count": Math.round((canadaRelative + Number.EPSILON) * 100) / 100},
    {"country": "España", "count": Math.round((espanaRelative + Number.EPSILON) * 100) / 100},
  ]);
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(express.static('js'))
