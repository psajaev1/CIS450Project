import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';
import ReactTable from 'react-table';
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

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

    this.columns = [
      {
        key: 'country',
        title: 'Country',
        dataKey: 'country',
        width: 600,
        resizable: true,
        frozen: Column.Alignment.CENTER,
      },
      {
        key: 'city',
        title: 'City',
        dataKey: 'city',
        width: 600,
        resizable: true,
        frozen: Column.Alignment.CENTER,
      },
      {
        key: 'airport',
        title: 'Airport',
        dataKey: 'name',
        width: 600,
        resizable: true,
        frozen: Column.Alignment.CENTER,
      },
      {
        key: 'code',
        title: 'Code',
        dataKey: 'iata',
        width: 600,
        resizable: true,
        frozen: Column.Alignment.CENTER,
      }
    ]
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
        this.setState({
          airports: topTenList
        })
      })
      .catch(err => console.log(err)) // Print the error if there is one.

  }




  render() {
    return (
      <div className="Dashboard">

        <PageNavbar active="Airports" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Countries</div>
            <div>Select a country to view all available airports!</div>
            <br></br>
            <div className="genres-container">
              {this.state.countries}
            </div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="h5">Airports</div>
            <BaseTable columns={this.columns} data={this.state.airports} width={1000} height={400}></BaseTable>
          </div>
        </div>
      </div>
    );
  }
}