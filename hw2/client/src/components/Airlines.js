import React, { Component } from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './AirlinesRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Airlines extends React.Component {
	constructor(props) {
		super(props);
		console.log("is anything being printed");
		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			lowerGDP: 0,
			upperGDP: 0,
			recMovies: []
		}

		this.handlelowerGDPChange = this.handlelowerGDPChange.bind(this);
		this.handleupperGDPChange = this.handleupperGDPChange.bind(this);
		this.submitGDP = this.submitGDP.bind(this);

	}



	handlelowerGDPChange(e) {
		this.setState({
			lowerGDP: e.target.value
		});
	}

	handleupperGDPChange(e) {
		this.setState({
			upperGDP: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitGDP() {
	console.log("hit submitGDP");
	

	var lGDP = this.state.lowerGDP;
	var rGDP = this.state.upperGDP;

	fetch("http://localhost:8081/Airlines/" + lGDP + "&" + rGDP , {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(movieList => {
		console.log("hit the json values");
        if (!movieList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.

        let movieDivs = movieList.map((movieObj, i) =>
            <RecommendationsRow name={movieObj.name} id={movieObj.id} SCountry={movieObj.SCountry} DCountry={movieObj.DCountry}/>
        ); 

				// movieDivs = movieList.map((movieObj, i) =>
				// 	<RecommendationsRow airport={movieObj.name} city={movieObj.City} />
				// );


				// Set the state of the genres list to the value returned by the HTTP response from the server.
				this.setState({
					recMovies: movieDivs
				})
			})
			.catch(err => console.log(err)) // Print the error if there is one.
	}


	render() {
		return (
			<div className="Airlines">
				<PageNavbar active="Airlines" />
			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">Airlines</div>
			    		<br></br>
			    		<div className="input-container">
			    			<input type='number' placeholder="Enter Lower Limit GDP" onChange={this.handlelowerGDPChange} id="lowerGDP" />
							<input type='number' placeholder="Enter Upper Limit GDP" onChange={this.handleupperGDPChange} id="upperGDP" />
			    		</div>
						<div>
						<button id="submitMovieBtn" className="submit-btn" onClick={this.submitGDP}>Submit</button>
						</div>

			    		<div className="header-container">
			    			<div className="h6">Here are possible airports</div>
			    			<div className="headers">
			    				<div className="header"><strong>Airline</strong></div>
			    				<div className="header"><strong>AirlineID</strong></div>
			    				<div className="header"><strong>Source</strong></div>
			    				<div className="header"><strong>Destination</strong></div>
			    			</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.recMovies}
			    		</div>
			    	</div>
			    </div>
		    </div>
		);
	}
}