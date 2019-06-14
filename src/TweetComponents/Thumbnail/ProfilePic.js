import React from 'react';
import './ProfilePic.scss';

const ProfilePic = (props) => {
	function handleShow() {
		if(props.item.retweeted_status) {
      props.onShow(props.item.retweeted_status.user.screen_name);
    } else {
      props.onShow(props.item.user.screen_name);
    }
  }

	let { item } = props;
	if (item.retweeted_status) {
		item = item.retweeted_status;
  }
    
	const imageUrl = (item.user.profile_image_url) ? item.user.profile_image_url.replace("_normal", "") : "";
	return(
  <div className="Tweet-thumbnail" onClick={() => handleShow()}>
    <img alt="Tweet-thumbnail" src={imageUrl} />
  </div>
	);
}

export default ProfilePic;