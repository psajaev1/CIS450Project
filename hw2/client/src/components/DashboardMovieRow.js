import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class DashboardMovieRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movie">
				<div className="rating">{this.props.country}</div>
				<div className="rating">{this.props.city}</div>
				<div className="rating">{this.props.airport}</div>
				<div className="rating">{this.props.code}</div>
			</div>
		);
	}
}
