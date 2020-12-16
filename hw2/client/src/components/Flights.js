import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			departureIATA: "",
			recFlights: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.searchFlights = this.searchFlights.bind(this);
	}

	handleChange(e) {
		this.setState({
			departureIATA: e.target.value
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	searchFlights() {
		fetch("http://localhost:8081/flights/" + this.state.departureIATA, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(recList => {
				if (!recList) return;

				let recDiv = recList.map((recObj, i) =>
					<RecommendationsRow airline={recObj.airline} country={recObj.country} city={recObj.city} airport={recObj.name} code={recObj.iata} />
				);

				this.setState({
					recFlights: recDiv
				})
			})
			.catch(err => console.log(err))	// Print the error if there is one.
	}


	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Search for Flights</div>
						<br></br>
						<div className="input-container">
							<div className="h6">Departure Airport</div>
							<input type='text' placeholder="Enter 3-Letter Airport Code" value={this.state.departureIATA} onChange={this.handleChange} id="movieName" className="movie-input" size="25" />
							<button id="submitMovieBtn" className="submit-btn" onClick={this.searchFlights}>Search</button>
						</div>
					</div>
					<div className="jumbotron">
						<div className="header-container">

							<div className="h5">Destinations</div>
							<div className="headers">
								<div className="header1"><strong>Arrival City</strong></div>
								<div className="header1"><strong>Arrival Country</strong></div>
								<div className="header1"><strong>Airline</strong></div>
								<div className="header1"><strong>Arrival Airport</strong></div>
								<div className="header1"><strong>Arrival Airport Code</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.recFlights}
						</div>
					</div>
				</div >
			</div >
		);
	}
}