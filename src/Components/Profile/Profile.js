
import React from 'react';
import Autolinker from 'autolinker';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import OptionsMenu from '../OptionsMenu/OptionsMenu';
import { formatCount } from '../../functions';
import './Profile.scss';

const Profile = (props) => {
  const autolinker = new Autolinker({
    urls: {
      schemeMatches: true,
      wwwMatches: true,
      tldMatches: true,
    },
    email: true,
    phone: true,
    mention: 'twitter',
    hashtag: 'twitter',
    stripPrefix: true,
    stripTrailingSlash: true,
    newWindow: true,
    truncate: {
      length: 0,
      location: 'end',
    },
    className: '',
  });

  function handleShow() {
    props.onShow(props.item.screen_name);
  }

	const { item, logedUserObject, userRelationship, followUser, unfollowUser, optionsToggle, 
		isOptionsOpen, logout, onFollowing, onFollowers, showLikes } = props;

  // Transforma la descripcion del perfil para que tenga LINKS Y MENCIONES
  const descriptionWithLinks = 	autolinker.link(item.description);


  let profileProps = {
    'dangerouslySetInnerHTML': {
      '__html': descriptionWithLinks
    }
  };

  let notMyprofile = true;
  if (logedUserObject.screen_name === item.screen_name) {
    notMyprofile = false;
  }
  const banner = item.profile_banner_url;
  const imageUrl = (item.profile_image_url) ? item.profile_image_url.replace('_normal', '') : '';
  return (
    <div className="Twitter-Profile">
      <div className="Profile" style={{ backgroundImage: `url(${banner})` }}>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 profile-picture">
          <img alt="profile" src={imageUrl} />
        </div>
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 profile-description">
          <ul className="description-header">
            <li className="user-title">
              <span>{item.name}</span>
              {
              notMyprofile
                ? userRelationship.relationship.target.followed_by === true
									? <button type="button" onClick={() => unfollowUser()} className="follow">Unfollow.</button> 
									: <button type="button" onClick={followUser} className="unfollow">Follow.</button>
                : (
                  <React.Fragment>
                    <div role="button" className="shaded-button" onClick={() => optionsToggle()}>
                      <MoreHoriz />
                    </div>
                    {
                  isOptionsOpen ? <OptionsMenu logout={() => logout()} /> : null
                }
                  </React.Fragment>
                )}
            </li>
            <li className="username">
              <b>@</b>
              <b>{item.screen_name}</b>
              {
								notMyprofile === true
								? userRelationship.relationship.target.following === true ? <span className="follow-badge">Follows you.</span> 
								: 
								null 
								: 
								null
							}
            </li>
          </ul>
          <div className="User-Description" {... profileProps} />
        </div>
      </div>
      <div className="connections">
        <button type="button" onClick={() => handleShow()} className="connections-tabs">
          <span>Tweets</span>
          {formatCount(item.statuses_count)}
        </button>
        <button type="button" onClick={() => onFollowing()} className="connections-tabs">
          <span>Following</span>
          {formatCount(item.friends_count)}
        </button>
        <button type="button" onClick={() => onFollowers()} className="connections-tabs">
          <span>Followers</span>
          {formatCount(item.followers_count)}
        </button>
        <button type="button" onClick={() => showLikes()} className="connections-tabs">
          <span>Likes</span>
          {formatCount(item.favourites_count)}
        </button>
      </div>
    </div>
  );
};

export default Profile;