import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AirlinesRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="movie">
				<div className="rating">{this.props.name}</div>
 				<div className="rating">{this.props.id}</div>
 				<div className="rating">{this.props.SCountry}</div>
 				<div className="rating">{this.props.DCountry}</div>
			</div>
		);
	}
}
