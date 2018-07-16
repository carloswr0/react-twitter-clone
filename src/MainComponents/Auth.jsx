import React from 'react';

class Auth extends React.Component {
	render(){

		let isItLoading = "";
		if(this.props.isLoadingAuth){
			isItLoading = "AuthLoading";
		}else{
			isItLoading = "";
		}

		return(
			<div className="AuthenticateTwitter">
			    <div className={`AuthTwitterLoader ${isItLoading}`}></div>   
			    <div className="EnterButton" onClick={this.props.authButtonClicked}>
					<i className="mdi mdi-twitter EnterButtonIcon"/> 	
				</div>	
			</div>
		)
	}
}


export default Auth