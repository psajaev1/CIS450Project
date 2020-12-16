var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  
  var query = `
    SELECT *
    FROM COUNTRIES;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err)
      console.log("hitting error");
    }
    else {
      console.log("hitting not error");
      //console.log(rows);
      res.json(rows);
    }
  });

};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  
  var genreName = req.params.genre;

  var query = `
    SELECT DISTINCT Movies.title, Movies.rating, Movies.vote_count
    FROM Movies
    JOIN Genres
    ON Genres.genre = '${genreName}' AND Movies.id = Genres.movie_id
    ORDER BY rating DESC, vote_count DESC
    LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });


};

/* ---- Q2 (Recommendations) ---- */
function getGDPCountries(req, res) {
  
  console.log("does it get to GDP query")
  var lowerGDP = req.params.lowerGDP;
  var upperGDP = req.params.upperGDP;
  console.log(lowerGDP);
  console.log(upperGDP);


  var query = `
    
  WITH temptable as 
  (SELECT DISTINCT airlines.name as tempname, airlines.AirlineID as badID
  From airlines
  Join routes 
  ON airlines.AirlineID = routes.airlineID
  Join airports 
  ON routes.destinationairportid = airports.ID
  Join countries
  ON airports.country = countries.country
  WHERE countries.GDPpercapita < 15 
  OR countries.GDPpercapita  > 25)
  SELECT DISTINCT airlines.name as airlines_name
  FROM airlines
  WHERE AirlineID NOT IN (SELECT badID FROM temptable);
  `;



  var testquery = `
  WITH temptable as 
  (SELECT DISTINCT name as tempname, AirlineID as badID
  From airlines
  Join routes 
  ON airlines.AirlineID = routes.airlineID
  Join airports 
  ON routes.destinationairportid = airports.ID
  Join countries
  ON airports.country = countries.country
  WHERE countries.GDPpercapita < ${lowerGDP} 
  OR countries.GDPpercapita  > ${upperGDP})
  SELECT DISTINCT airlines.name as airlines_name
  FROM airlines
  WHERE AirlineID NOT IN (SELECT badID FROM temptable);
  
  `;

  // SELECT DISTINCT name 
  // FROM airlines
  // WHERE name NOT IN (SELECT name FROM temp_table);

  connection.query(testquery, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      console.log("goin to json now");
      res.json(rows);
    }
  });

};

/* ---- (Best Genres) ---- */
function getPennStudents(req, res) {

  console.log("does it get to pennStudents query")
  var covidDeaths = req.params.covidDeaths;
  var popDensity = req.params.popDensity;
  console.log(covidDeaths);
  console.log(popDensity);


	var query = `

  WITH temptable1 as 
  (SELECT DISTINCT sourceairportid, destinationairportid
  FROM routes
  JOIN airports
  ON routes.sourceairportid = airports.id
  WHERE airports.city = 'Philadelphia')
  SELECT DISTINCT airports.city as City, airports.country as Country
  FROM airports
  JOIN countries 
  ON airports.country = countries.Country
  JOIN covid
  ON countries.Country = covid.Country
  WHERE countries.PopDensity > ${popDensity} 
  AND covid.Date = "2020-07-27"
  AND covid.Confirmed < ${covidDeaths};
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

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {

  var selDecadeStartstr = req.params.decade;
  var selDecadeStart = parseInt(selDecadeStartstr, 10);
  var selDecadeEnd = selDecadeStart + 9;

  var query = `
  WITH temp_table as 
  (SELECT Movies.id as id, Genres.genre as genre, Movies.rating as rating, Movies.release_year as release_year
  FROM Movies 
  JOIN Genres 
  ON Movies.id = Genres.movie_id),
  dec_table as 
  (SELECT * 
  FROM temp_table 
  WHERE temp_table.release_year >= '${selDecadeStart}' AND temp_table.release_year <= '${selDecadeEnd}'), 
  genre_table as 
  (SELECT DISTINCT genre FROM Genres),
  temp_table2 as 
  (SELECT genre_table.genre, AVG(dec_table.rating) as avg_rating
  FROM dec_table
  RIGHT JOIN genre_table 
  ON dec_table.genre = genre_table.genre
  GROUP BY genre_table.genre
  ORDER BY AVG(dec_table.rating) DESC, genre_table.genre)
  SELECT genre, IFNULL(avg_rating, 0) as avg_rating
  FROM temp_table2;

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });



};

// The exported functions, which can be accessed in index.js.
module.exports = {
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getGDPCountries: getGDPCountries,
	getPennStudents: getPennStudents,
  bestGenresPerDecade: bestGenresPerDecade
}