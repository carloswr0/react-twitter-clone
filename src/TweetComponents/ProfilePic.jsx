import React, {Component} from 'react';


class ProfilePic extends Component {
	constructor(props){
		super(props);
		this.state = {

		};
		this.handleShow = this.handleShow.bind(this);
	}

	handleShow(e){
		console.log(this.props.item);
	    if(this.props.item.retweeted_status)
	    {
	      this.props.onShow(this.props.item.retweeted_status.user.screen_name);
	    }else
	    {
	      this.props.onShow(this.props.item.user.screen_name);
	    }
  	}

	render(){
		let {item} = this.props
		if (item.retweeted_status) {
	      	item = item.retweeted_status
	    }
	    const imageUrl=(item.user.profile_image_url)?item.user.profile_image_url.replace("_normal",""):"";
		return(<div className="ProfilePic" onClick={this.handleShow}>
				<img className="Tweets-Avatar" alt="avatarpicturethumbnail" src={imageUrl} />
			</div>
		);
	}
}

export default ProfilePic