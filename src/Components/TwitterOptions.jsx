import React, {Component} from 'react'

class TwitterOptions extends Component {
	render(){
	return(
			<div className="animated fadeIn Instagram-Options">
				<ul className="Instagram-Options-List">
					<div className="Instagram-Options-Cont">
						<li className="Instagram-Options-Li" onClick={this.props.logout}>Logout</li>
					</div>	
				</ul>				
	      	</div>
      	)
	}
}

export default TwitterOptions