import React, {Component} from 'react';
import Clear from '@material-ui/icons/Clear';
import './Reply.scss';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      remainingCharacters: 280,
    };
  }
	
	handleChange(event) {
    const input = event.target.value;
		this.setState({
			remainingCharacters: 280 - input.length,
			text: input,
		});
  }
  
	sendTweet() {
    const { onSubmit } = this.props;
    const { text} = this.state;
		onSubmit(text);
    this.setState({
			text: '',
			remainingCharacters: 280,
		});
	}

  render() {
    const { item, onSubmit, value, closeReplyTweet, replyIndex} = this.props;
    const { remainingCharacters, text} = this.state;

    const styleRemainingChars = {	
      'color': '#aab8c2',
      'fontSize': '1rem',
    };
    
    if (remainingCharacters < 20) {
      styleRemainingChars.color = '#d3263b';
    }
    
    const replyNode = (
      <div className="Reply-Tweet">
        <form> 
          <textarea
            maxLength="280"
            placeholder="Write a message..."
            value={value}
            onChange={this.handleChange.bind(this)}
            defaultValue={'@'+item.user.screen_name+' '}
          />
          <div> 
            <span style={styleRemainingChars}>{remainingCharacters}</span>
          </div>
        </form>
        <div className="Interactions">
          <button type="button" className="Send-reply" onClick={() => onSubmit(text)}> 
            Responder.
          </button>	
          <div> 
            <Clear
              className="Close" 
              onClick={closeReplyTweet}
            />
          </div>
        </div>
      </div>
    );

    // Abstracted the component for a cleaner render/return conditional statement.
    if (replyIndex === item.id_str) {
      return replyNode;
    } else {
      return null;
    }
  }
}
  
export default Reply