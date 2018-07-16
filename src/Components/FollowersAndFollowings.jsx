import React from 'react';

class FollowersAndFollowings extends React.Component {
	constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this);
    this.handleFollows = this.handleFollows.bind(this);
    this.handleUnfollows = this.handleUnfollows.bind(this);
 	}

	handleShow(e){
    	this.props.onShow(this.props.item.screen_name);
 	}

 	handleFollows(e){
    	this.props.followUser(this.props.item.id_str, this.props.index, e);
 	}

 	handleUnfollows(e){
    	this.props.unfollowUser(this.props.item.id_str, this.props.index, e);
 	}

	render(){
		const {item} = this.props
		return(
			<div className="row ListedUser">
				<div className="followerInfoDiv" style={{textDecoration: 'none'}}>
					<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3  evenAnotherUserInfoDiv" onClick={this.handleShow}>
						<img className="ListedUser-Avatar" alt="UserAvatar" src={item.profile_image_url} />
						<div className="anotherInfoDiv">
							<strong className="ListedUser-Fullname">{item.name}{' '}</strong>
					        <span className="ListedUser-UserName">
						        <s className="ListedUser-UserScreenNameAt">{'@'}</s>
						        <b className="ListedUser-UserScreenName">{item.screen_name}</b>
					        </span>
					    </div>
					</div>
					<div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 ListedUser-Bio">
				    	{item.description}
				    </div>
				    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 followButtonDiv">
			     	{	
				    	item.following ? 
				    	<button 
				    		onClick={this.handleUnfollows} 
				    		className="UnfollowBttnList">
				    		Unfollow.
				    	</button> :
						<button 
							onClick={this.handleFollows} 
							className="FollowBttn">
							Follow.
						</button>
					}
					</div>
				</div>	
			</div>
		);
	}
}


export default FollowersAndFollowings