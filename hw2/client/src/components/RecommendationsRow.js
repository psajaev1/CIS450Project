import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movie">
				<div className="city">{this.props.city}</div>
				<div className="country">{this.props.country}</div>
				<div className="airline">{this.props.airline}</div>
				<div className="airport">{this.props.airport}</div>
				<div className="code">{this.props.code}</div>
			</div>
		);
	}
}
