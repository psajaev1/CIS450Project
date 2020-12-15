import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Airports extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      countries: [],
      airports: []
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/countries", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(genreList => {
        if (!genreList) return;
        // Map each obj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((obj, i) =>
          <GenreButton id={"button-" + obj.country} onClick={() => this.showMovies(obj.country)} country={obj.country} />
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          countries: genreDivs
        })
      })
      .catch(err => console.log(err)) // Print the error if there is one.
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(country) {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/countries/" + country, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(topTenList => {
        if (!topTenList) return;

        let topTenDiv = topTenList.map((movieObj, i) =>
          <DashboardMovieRow country={movieObj.country} city={movieObj.city} airport={movieObj.name} code={movieObj.iata} />
        );

        this.setState({
          airports: topTenDiv
        })
      })
      .catch(err => console.log(err)) // Print the error if there is one.

  }


  

  render() {
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Countries</div>
            <div className="genres-container">
              {this.state.countries}
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
            <div className="h5">Airports</div>
              <div className="movies-header">
                <div className="header"><strong>Country</strong></div>
                <div className="header"><strong>City</strong></div>
                <div className="header"><strong>Airport</strong></div>
                <div className="header"><strong>Code</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.airports}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}