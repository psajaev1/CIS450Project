import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestGenres from './BestGenres';
import COVID from './COVID';
import Airports from './Airports';
import Flights from './Flights';
import Airlines from './Airlines';
import PennStudents from './PennStudents';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Airports />
							)}
						/>
						<Route
							exact
							path="/Airports"
							render={() => (
								<Airports />
							)}
						/>
						<Route
							path="/Airlines"
							render={() => (
								<Airlines />
							)}
						/>
						<Route
							path="/Flights"
							render={() => (
								<Flights />
							)}
						/>
						<Route
							path="/COVID"
							render={() => (
								<COVID />
							)}
						/>
						<Route
							path="/PennStudents"
							render={() => (
								<PennStudents />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}