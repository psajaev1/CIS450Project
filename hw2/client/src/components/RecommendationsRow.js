import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RecommendationsRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="cityResults">
				<div className="airport">{this.props.airport}</div>
				<div className="city">{this.props.City}</div>
			</div>
		);
	}
}
