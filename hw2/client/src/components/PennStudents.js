import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'



export default class PennStudents extends React.Component {
	constructor(props) {
		super(props);



		this.columns = [
			{
			  key: 'City',
			  title: 'Destination City',
			  dataKey: 'City',
			  width: 600,
			  resizable: true,
			  sortable: true,
			  frozen: Column.Alignment.CENTER,
			},
			{
			  key: 'Country',
			  title: 'Destination Country',
			  dataKey: 'Country',
			  width: 600,
			  align: Column.Alignment.CENTER,
			  sortable: false,
			}
		  ]

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			covidDeaths : 1000000,
			popDensity : 0,
			recMovies: []
		}

		this.handleCovidDeathChange = this.handleCovidDeathChange.bind(this);
		this.handlePopDensityChange = this.handlePopDensityChange.bind(this);
		this.pennStudents = this.pennStudents.bind(this);
	}

	handleCovidDeathChange(e) {
		this.setState({
			covidDeaths: e.target.value
		});
	}

	handlePopDensityChange(e) {
		this.setState({
			popDensity: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	pennStudents() {
		
	var pDens = this.state.popDensity;

	fetch("http://localhost:8081/PennStudents/" + pDens, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(movieList => {
        if (!movieList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.

        // let movieDivs = movieList.map((movieObj, i) =>
        //    <RecommendationsRow airport={movieObj.City} city={movieObj.Country}/>
        // ); 


        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          recMovies: movieList
        })
      })
      .catch(err => console.log(err)) // Print the error if there is one.
  }

	
	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="PennStudents" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">Nonstop Philadelphia Flight Destinations for Penn Students</div>
			    		<br></br>
			    		<div className="input-container">
			    		</div>
						<input type='number' placeholder="Lower limit GDP Density" onChange={this.handlePopDensityChange} />
						<div className="submit-container">
						<button id="submitMovieBtn" className="submit-btn" onClick={this.pennStudents}>Submit</button>

						</div>

			    		<div className="header-container">
			    			<div className="h6">Here are possible nonstop Destinations </div>
			    			<div className="headers">
			    			</div>
			    		</div>
			    		{/* <div className="results-container" id="results">
			    			{this.state.recMovies}
			    		</div> */}
						<BaseTable columns={this.columns} data={this.state.recMovies} width={1050} height={400}>

						</BaseTable>
			    	</div>
			    </div>
		    </div>
		);
	}
}
