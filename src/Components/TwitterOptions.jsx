import React, {Component} from 'react'

class TwitterOptions extends Component {
	render(){
	return(
			<div className="animated fadeIn Twitter-Options">
						<span className="Twitter-Options-Li" onClick={this.props.logout}>Logout</span>
						<span className="Twitter-Options-Li">Another option</span>
						<span className="Twitter-Options-Li">Even another one</span>		
	      	</div>
      	)
	}
}

export default TwitterOptions