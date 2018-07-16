import React, { Component } from 'react';

class LittleLoader  extends Component {
	render() {
		const message = typeof this.props.message !== "undefined" && this.props.message !== null && this.props.message ? this.props.message : '';
		let style = {};
		if(this.props.style) style = this.props.style;
		return(
			<div className="loader-container" style={style}>
				<div className="sk-fading-circle">
					<div className="sk-circle1 sk-circle"></div>
					<div className="sk-circle2 sk-circle"></div>
					<div className="sk-circle3 sk-circle"></div>
					<div className="sk-circle4 sk-circle"></div>
					<div className="sk-circle5 sk-circle"></div>
					<div className="sk-circle6 sk-circle"></div>
					<div className="sk-circle7 sk-circle"></div>
					<div className="sk-circle8 sk-circle"></div>
					<div className="sk-circle9 sk-circle"></div>
					<div className="sk-circle10 sk-circle"></div>
					<div className="sk-circle11 sk-circle"></div>
					<div className="sk-circle12 sk-circle"></div>
				</div>
				{
					message ? <div className="loader-text">{message}</div> : null
				}
			</div>
		);
	}
};

export default LittleLoader;