import React from 'react';

class NewTweet extends React.Component {
	
	constructor(props){
	    super(props);
	    this.state = { 
	      remainingCharacters: 280,
	      tweetText: '@'+this.props.item.screen_name+' ',
	    };
	    this.sendTweet = this.sendTweet.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.item.screen_name !== this.props.item.screen_name){
			this.setState({
				tweetText: '@'+nextProps.item.screen_name+' ',
			})
		}
	}

	handleChange(event) {
	    var inputTweet = event.target.value;
		this.setState({
			remainingCharacters : 280 - (inputTweet.length),
			tweetText : (inputTweet)
		});
	}

	sendTweet(e) {
		this.props.onSubmit(this.state.tweetText);
	    this.inputTweet.value = '';
	    this.setState({
			tweetText : "",
			remainingCharacters : 280
		});
	}

	render() { 
	const {item, logedUserItem} = this.props
	const styleRemainingChars = {
		'float': 'right',
		'color': 'white',
		'left': '30px',
		'fontWeight': 'bold',
		'minWidth' : '24px',
		'fontFamily': 'Roboto',
	}
		
	if (this.state.remainingCharacters < 20) {
		styleRemainingChars.color = '#d3263b';
	}
	
	//Toma la imagen en HD de los servidores de Twitter
	const imageUrl=(item.profile_image_url)?item.profile_image_url.replace("_normal",""):"";

	return(
		<div className="row NewTweet">
			
			<div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 NewTweet-Avatar-Div">
				<img className="NewTweet-Avatar" alt="NewTweetUserPicture" src={imageUrl} />
			</div>

			<div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 NewTweet-Text">
				<form className="NewTweet-Form"> 
					<textarea className="NewTweet-TextArea"
						maxLength="280"
						placeholder="What's happening?"
						value={this.state.tweetText}
						onChange={this.handleChange.bind(this)}
						//defaultValue={this.state.tweetText}
						ref={inputTweet => this.inputTweet = inputTweet}
					/>
				</form>
			</div>

			<span style={styleRemainingChars} className="NewTweet-RemainingCharacters">{this.state.remainingCharacters}</span>
			
			<i 
				className="col-xs-1 col-sm-1 col-md-1 col-lg-1 mdi mdi-pencil NewTweet-Button-Icon" 
				onClick={this.sendTweet} 
			/>

		</div>
		);
	}
}

export default NewTweet