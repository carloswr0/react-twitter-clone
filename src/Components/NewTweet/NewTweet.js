import React from 'react';
import Create from '@material-ui/icons/Create';
import './NewTweet.scss'

class NewTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			remainingCharacters: 280,
			tweetText: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		const { item } = this.props;
		if(nextProps.item.screen_name !== item.screen_name){
			this.setState({
				tweetText: '@'+nextProps.item.screen_name+' ',
			})
		}
	}

	handleChange(event) {
		const inputTweet = event.target.value;
		this.setState({
			remainingCharacters : 280 - (inputTweet.length),
			tweetText : (inputTweet)
		});
	}

	sendTweet() {
		const { tweetText } = this.state;
		const { onSubmit } = this.props;
		onSubmit(tweetText);
			this.inputTweet.value = '';
			this.setState({
			tweetText : "",
			remainingCharacters : 280
		});
	}

	render() { 
	const { item } = this.props;
	const { remainingCharacters, tweetText } = this.state;
	const styleRemainingChars = {
		'color': 'white',
		'display': 'flex',
		'justifyContent': 'center',
	};

	if (remainingCharacters < 20) {
		styleRemainingChars.color = '#d3263b';
	}

	const imageUrl = (item.profile_image_url) ? item.profile_image_url.replace("_normal", "") : "";
	return (
  <div className="write-tweet">
    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 avatar-container">
      <img className="avatar" alt="user" src={imageUrl} />
    </div>
    <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
      <form> 
        <textarea
          maxLength="280"
          placeholder="What's happening?"
          value={tweetText}
          onChange={this.handleChange.bind(this)}
          ref={inputTweet => this.inputTweet = inputTweet}
        />
      </form>
    </div>
    <span style={styleRemainingChars} className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
      {remainingCharacters}
    </span>		
    <Create 
      className="col-xs-1 col-sm-1 col-md-1 col-lg-1" 
      onClick={() => this.sendTweet()}
    />
  </div>
		);
	}
}

export default NewTweet