var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


//Get all available countries
function getAllCountries(req, res) {
  var query = `
    SELECT DISTINCT country
    FROM countries
    WHERE country != 'Country'
  `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

//Get all airports in a country
function getCountryInfo(req, res) {
  var selectedCountry = req.params.selectedCountry;

  var query = `
  	SELECT country, name, city, iata
  	FROM airports 
  	WHERE country = '${selectedCountry}'
  	ORDER BY city
  `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function flights(req, res) {
  var selectedCode = req.params.selectedCode;

  //airline, country, city, name, iata

  var query = `
      SELECT X.name AS airline, Y.country, Y.city, Y.name, Y.iata 
      FROM routes R, airports A, airlines X, airports Y
      WHERE A.iata = '${selectedCode}'
      AND A.id = R.source_airport_id
      AND R.airlineID = X.id
      AND R.dest_airport_id = Y.id
      ORDER BY city
  `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getGDPCountries(req, res) {
  
  console.log("does it get to GDP query")
  var lowerGDP = req.params.lowerGDP;
  var upperGDP = req.params.upperGDP;
  console.log(lowerGDP);
  console.log(upperGDP);



  var query = `
  WITH RelevantAirlines AS (
  SELECT DISTINCT routes.airlineID AS ID, airlines.Name AS Name, routes.sourceairportid AS SourceID, routes.destinationairportid AS DestID
  FROM routes
  JOIN airlines ON routes.airlineID = airlines.AirlineID
  WHERE routes.sourceairportid IN (
  SELECT airports.id
  FROM countries 
  JOIN airports ON replace(airports.country,' ', '') = countries.country
  WHERE countries.GDP_per_capita >= ${lowerGDP} AND countries.GDP_per_capita <= ${upperGDP}) AND 
  routes.destinationairportid IN (
  SELECT airports.id
  FROM countries 
  JOIN airports ON replace(airports.country,' ', '') = countries.country
  WHERE countries.GDP_per_capita >= ${lowerGDP} AND countries.GDP_per_capita <= ${upperGDP})),

  SourceCountries AS (
  SELECT RelevantAirlines.ID, RelevantAirlines.Name, airports.country AS SourceCountry, RelevantAirlines.DestID
  FROM RelevantAirlines
  JOIN airports ON airports.ID = RelevantAirlines.SourceID)

  SELECT Distinct SourceCountries.ID AS id, SourceCountries.Name as name, SourceCountries.SourceCountry AS SCountry, airports.country AS DCountry
  FROM SourceCountries
  JOIN airports ON airports.ID = SourceCountries.DestID;

  `;


  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      console.log("goin to json now");
      res.json(rows);
    }
  });

};



/* ---- (Penn Students) ---- */ 
function getPennStudents(req, res) {  

  console.log("does it get to pennStudents query")  
  var popDensity = req.params.popDensity; 


  var query = ` 
  WITH temptable1 as  
  (SELECT DISTINCT sourceairportid, destinationairportid  
  FROM routes 
  JOIN airports 
  ON routes.sourceairportid = airports.id 
  WHERE airports.city = 'Philadelphia'),  
  temptable2 as   
  (SELECT DISTINCT airports.city as City, airports.country as Country, ID 
  FROM airports 
  JOIN countries  
  ON REPLACE(airports.country, ' ', '') = REPLACE(countries.Country, ' ', '') 
  WHERE countries.Pop_density > '${popDensity}') 
  SELECT * FROM temptable2  
  WHERE temptable2.ID IN (SELECT destinationairportid FROM temptable1); 
  `;  
  connection.query(query, function(err, rows, fields) { 
    if (err) console.log(err);  
    else {  
      console.log(rows);  
      console.log("querying rows now"); 
      res.json(rows); 
    } 
  }); 
} 

// The exported functions, which can be accessed in index.js. 
module.exports = {  

  getAllCountries: getAllCountries, 
  getCountryInfo: getCountryInfo, 
  getGDPCountries: getGDPCountries, 
  getPennStudents: getPennStudents, 
  flights: flights  
}
