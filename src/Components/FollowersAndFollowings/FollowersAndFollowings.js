import React from 'react';
import './FollowersAndFollowings.scss';

const FollowersAndFollowings = (props) => {
	function handleShow() {
    props.onShow(props.item.screen_name);
	}

	function handleFollows() {
    props.followUser(props.item.id_str, props.index);
	}

	function handleUnfollows() {
    props.unfollowUser(props.item.id_str, props.index);
  }
   
  const { item } = props;
  
	return (
  <div className="Connection">
    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3  avatar-container" onClick={() => handleShow()}>
      <img className="user-photo" alt="connections" src={item.profile_image_url} />
      <div className="user-usernames">
        <b className="connection-text">
          {item.name}
          {' '}
        </b>
        <b className="connection-text">
          {'@'}
          {item.screen_name}
        </b>
      </div>
    </div>
    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 user-description">
      {item.description}
    </div>
    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 action">
      {	
				item.following ? (
  <button
    type="button"
    onClick={() => handleUnfollows()} 
    className="unfollow"
  >
		Unfollow.
  </button>
): (
  <button
    type="button"
    onClick={() => handleFollows()} 
    className="follow"
  >
    Follow.
  </button>
)}
    </div>
  </div>
	);
}

export default FollowersAndFollowings;