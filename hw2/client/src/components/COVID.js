import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from 'react-table';
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

export default class COVID extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCountry: "",
			countries: [],
			cases: []
		};

		this.submitCountry = this.submitCountry.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.columns = [
			{
				key: 'date',
				title: 'Date',
				dataKey: 'Date',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			},
			{
				key: 'confirmed',
				title: 'Total Cases Confirmed',
				dataKey: 'confirmed',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			},
			{
				key: 'deaths',
				title: 'Total Deaths',
				dataKey: 'deaths',
				width: 600,
				resizable: true,
				sortable: true,
				frozen: Column.Alignment.CENTER,
			}
		]
	}

	handleChange(e) {
		this.setState({
			selectedCountry: e.target.value
		});
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {

		fetch("http://localhost:8081/covid", {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(decList => {
				if (!decList) return;
				// Map each genreObj in genreList to an HTML element:
				// A button which triggers the showMovies function for each genre.
				let decDivs = decList.map((decObj, i) =>
					<option label={decObj.countries} value={decObj.countries} onClick={() => this.handleChange(decObj)} />
				);

				this.setState({
					countries: decDivs
				})
			}).catch(err => console.log(err))
	}





	/* ---- Q3b (Best Genres) ---- */
	submitCountry(country) {

		var country = this.state.selectedCountry;

		// Send an HTTP request to the server.
		fetch("http://localhost:8081/covid/" + country, {
			method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json()) // Convert the response data to a JSON.
			.then(bestList => {
				this.setState({
					cases: bestList
				})
			})
			.catch(err => console.log(err)) // Print the error if there is one.

	}

	render() {

		return (
			<div className="COVID">
				<PageNavbar active="COVID" />

				<div className="container bestgenres-container">
					<div className="jumbotron">
						<div className="h5">Track Covid Growth by Country</div>
						<div className="dropdown-container">
							<select value={this.state.selectedCountry} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
								<option select value> -- select a country -- </option>
								{this.state.countries}
							</select>
							<button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitCountry}>Search</button>
						</div>
						<br></br>
						<BaseTable columns={this.columns} data={this.state.cases} width={1000} height={400}></BaseTable>
					</div>
				</div>
			</div>
		);
	}
}