import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from 'react-table';
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

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

		this.columns = [
			{
				key: 'city',
				title: 'City',
				dataKey: 'city',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			},
			{
				key: 'country',
				title: 'Country',
				dataKey: 'country',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			},
			{
				key: 'airline',
				title: 'Airline',
				dataKey: 'airline',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			},
			{
				key: 'airport',
				title: 'Airport',
				dataKey: 'name',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			},
			{
				key: 'code',
				title: 'Code',
				dataKey: 'iata',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			}
		]
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
				this.setState({
					recFlights: recList
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
						<div className="h5">Destinations</div>
						<BaseTable columns={this.columns} data={this.state.recFlights} width={1000} height={400}></BaseTable>
					</div>
				</div >
			</div >
		);
	}
}