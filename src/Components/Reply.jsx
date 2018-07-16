import React, {Component} from 'react'

class Reply extends Component {

	constructor(props){
    super(props);
    this.state = { 
      tweetText: "",
      remainingCharacters: 280,
    };
	}

	handleChange(event) {
    var input = event.target.value;
		this.setState({
			remainingCharacters : 280 - (input.length),
			tweetText : (input)
		});
	}

	sendTweet(e) {
		this.props.onSubmit(this.state.tweetText);
	    this.inputReply.value = '';
	    this.setState({
			tweetText : "",
			remainingCharacters : 280
		});
	}
	
	render(){
		const {item} = this.props

		const styleRemainingChars = {	
		'fontWeight': 'bold',
		'color': '#aab8c2',
    	'fontSize': '1.5em',
    	'paddingRight': '10px',
    	'fontFamily': 'Roboto',
		}
			
		if (this.state.remainingCharacters < 20) {
			styleRemainingChars.color = '#d3263b';
		}
	
		if(this.props.replyIndex === item.id_str){
			return(
				<div className="row Reply-Tweet">
			        <div className="row Reply-Tweet-Div" >
						<form className="Reply-Tweet-Form"> 
							<textarea className="Reply-Tweet-TextArea"
								maxLength="280"
								placeholder="Let's talk..."
								value={this.props.value}
								onChange={this.handleChange.bind(this)}
								defaultValue={'@'+item.user.screen_name+' '}
								ref={inputReply => this.inputReply = inputReply}
							/>
						</form>
			        </div>
			        <div className="row ReplyMenu">
				        <div className="IconContainerReply"> 
							<i className="mdi mdi-pencil Reply-Button-Icon" onClick={this.props.onSubmit.bind(this,this.state.tweetText)} /> 
				        </div>	
				        <div className="IconContainerReply"> 
			        		<span className="Reply-RemainingCharacters" style={styleRemainingChars}>{this.state.remainingCharacters}</span>
			        	</div>
			       		<div className="IconContainerReply"> 
			        		<i className="mdi mdi-close Reply-Button-Icon-Close Reply-Tweet-Close" onClick={this.props.closeReplyTweet}/>
			        	</div>
			        </div>
		      	</div>)}
			else{
				return(<div></div>);
		}
	}
}

export default Reply