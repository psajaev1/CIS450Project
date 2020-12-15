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
    
    SELECT DISTINCT name as tempname, AirlineID as badID
    From airlines
    Join countries
    ON airlines.country = countries.country
    WHERE countries.GDPpercapita >= ${lowerGDP} 
    OR countries.GDPpercapita  <= ${upperGDP};
  `;



  var testquery = `
  WITH temptable as 
  (SELECT DISTINCT name as tempname, AirlineID as badID
  From airlines
  Join countries
  ON airlines.country = countries.country
  WHERE countries.GDPpercapita < 1 
  OR countries.GDPpercapita  > 10)
  SELECT DISTINCT name, AirlineID 
  FROM airlines
  WHERE AirlineID NOT IN (SELECT badID FROM temptable);
  
  `;

  // SELECT DISTINCT name 
  // FROM airlines
  // WHERE name NOT IN (SELECT name FROM temp_table);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      console.log("goin to json now");
      res.json(rows);
    }
  });

};



// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllCountries: getAllCountries,
  getCountryInfo: getCountryInfo,
 	getGDPCountries: getGDPCountries,
  flights: flights
}
