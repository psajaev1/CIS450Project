import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class COVID extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
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
          <option label={decObj.decade} value={decObj.decade} onClick={() => this.handleChange(decObj)} />
        );

        this.setState({
        	decades: decDivs
        })
		}).catch(err => console.log(err))
	}





	/* ---- Q3b (Best Genres) ---- */
	submitDecade(decade) {
	
	var decade = this.state.selectedDecade;

        // Send an HTTP request to the server.
    fetch("http://localhost:8081/covid/" + decade, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(bestList => {
        if (!bestList) return;

        let bestDivs = bestList.map((bestObj, i) =>
          <BestGenreRow genre={bestObj.genre} rating={bestObj.avg_rating} />
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        // not really sure if we need this in all the finals
        this.setState({
          genres: bestDivs
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
			        <div className="h5">Best Genres</div>

			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Genre</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}