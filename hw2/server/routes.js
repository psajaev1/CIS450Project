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
    SELECT DISTINCT genre
    FROM Genres;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
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
function getRecs(req, res) {
  
  var movieTitle = req.params.title;

  var query = `
    WITH genre_table AS
    (SELECT genre as m_genre, Movies.id as id 
    FROM Genres
    JOIN Movies
    ON Genres.movie_id = Movies.id
    WHERE Movies.title = '${movieTitle}')
    SELECT title, id, rating, vote_count
    FROM Movies
    JOIN Genres 
    ON Movies.id = Genres.movie_id
    WHERE Genres.genre IN (SELECT m_genre FROM genre_table)
    GROUP BY Movies.id
    HAVING COUNT(DISTINCT Genres.genre) = (SELECT COUNT(m_genre) FROM genre_table)
    AND Movies.title <> '${movieTitle}'
    ORDER BY rating DESC, vote_count DESC
    LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("done loading lol");
      res.json(rows);
    }
  });

};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
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
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade
}