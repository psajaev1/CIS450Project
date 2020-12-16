const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */



app.get('/countries', routes.getAllCountries);
	
app.get('/countries/:selectedCountry', routes.getCountryInfo);

app.get('/flights/:selectedCode', routes.flights);
  
/* ---- Q2 (Recommendations) ---- */
app.get('/Airlines/:lowerGDP&:upperGDP', routes.getGDPCountries);


// PENN STUDENTS 
app.get('/PennStudents/:popDensity', routes.getPennStudents);


app.get('/COVID/:selectedCountry', routes.getCOVIDCases);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});