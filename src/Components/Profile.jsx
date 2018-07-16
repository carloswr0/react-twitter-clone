import React from 'react'
import Autolinker from 'autolinker'
import LittleLoader from './LittleLoader.jsx';
import SearchWindow from '../Components/SearchWindow.jsx';
import TwitterOptions from './TwitterOptions.jsx';


import NotificationsNone from '@material-ui/icons/NotificationsNone';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Language from '@material-ui/icons/Language';
import Search from '@material-ui/icons/Search';
import Home from '@material-ui/icons/Home';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

var autolinker = new Autolinker( {
    urls : {
        schemeMatches : true,
        wwwMatches    : true,
        tldMatches    : true
    },
    email       : true,
    phone       : true,
    mention     : 'twitter',
    hashtag     : 'twitter',

    stripPrefix : true,
    stripTrailingSlash : true,
    newWindow   : true,

    truncate : {
        length   : 0,
        location : 'end'
    },

    className : ''
} );

class Profile extends React.Component {
	
	constructor(props){
	    super(props);
	    this.state = { 
	    	searchText: "",
	    };
	    this.profileState = this.profileState.bind(this);
	    this.handleShow = this.handleShow.bind(this);
	    this.onInputEnter = this.onInputEnter.bind(this);
	    this.onIconPress = this.onIconPress.bind(this);
	    this.handleChange = this.handleChange.bind(this);
  	}

  	componentDidMount(){
  		this.props.saveStorage;
  	}

  	formatCount (count) {
    const readablize = num => {
      var e = Math.floor(Math.log(num) / Math.log(1000))
      return (num / Math.pow(1000, e)).toFixed(1) + 'K'
    }

    if (count > 999) return readablize(count)
    else return count
  	}
  	
  	handleShow(e){
    	this.props.onShow(this.props.item.screen_name);
  	}

  	profileState(state){
  		this.setState(state);
  		this.input.value = "";
  	}

	//Funcion de agregar.
  
	onInputEnter(e) {
        if (e.key === 'Enter') {
            if (e.target.value){
                let item = e.target.value;
                // Now add it to the 'items' array state
                this.props.onSearch(item);
                // On enter, remove the value from the input
                e.preventDefault();
                e.target.value = '';
                this.setState({searchText: ""});
            }
        }
    }

    //Funcion de agregar con el evento por presionar el Icono
    onIconPress() {   
        if (this.state.searchText.length > 0){
            // Now add it to the 'items' array state
            this.props.onSearch(this.state.searchText);
            // On enter, remove the value from the input
            this.input.value = '';
            this.setState({searchText: ""});
        }
    }

  	handleChange(event) {
        let input = event.target.value;
        this.setState({
            searchText : (input)
        });
        this.props.showTypeaheadModal(input);
    }

	render() { 
			//Toma Item viniendo de APP.js
			let {item} = this.props;
			
			//Toma la imagen en HD de los servidores de Twitter
			const imageUrl=(item.profile_image_url)?item.profile_image_url.replace("_normal",""):"";
			
			//Transforma la descripcion del perfil para que tenga LINKS Y MENCIONES
			var descriptionWithLinks = 	autolinker.link(item.description);

			var	expanded_url = "";
			var display_url = "";

			if (item.url !== null)
			{
				expanded_url = item.entities.url.urls[0].expanded_url
				display_url = item.entities.url.urls[0].display_url
			}

			//La inserta a la fuerza al HTML para que sean funcionales los links
			function createMarkup() {
	  		return {
	  			__html: descriptionWithLinks};
			}

			let notMyprofile = true;

			if (this.props.logedUserObject.screen_name === item.screen_name){
				notMyprofile = false;
			}

			const banner = item.profile_banner_url;

			return ( 
			<div className="Twitter-Profile"> 
				<div className="row rowProfile" style={{ backgroundImage: `url(${banner})` }}>
					<div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 Avatar-Div">
						<img className="Twitter-Profile-Avatar" alt="UserPicture" src={imageUrl} />
					</div>
					
					<div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 Twitter-Profile-Info">
						<ul className="Twitter-Profile-Info-List">
							<li className="UserTitle">
								<span className="UserTitle">{item.name}</span>
							{  
							 	notMyprofile === true ? 
							 	this.props.userRelationship.relationship.target.followed_by === true ? 
							 	<button onClick={this.props.unfollowUser} className="UnfollowBttn">Unfollow.</button> : 
							 	<button onClick={this.props.followUser} className="FollowBttn">Follow.</button> 
							 	:
							 	<div>
							 		<div className="shaded-button" onClick={this.props.optionsToggle}>
							 			<MoreHoriz className="Twitter-Profile-Navigation-Icon"/>
							 		</div>
							 		{
							 			this.props.isOptionsOpen ?
							 			<TwitterOptions 
							 				logout={this.props.logout}
							 			/>
							 			: 
							 			null
							 		}
							 	</div>
							}
							</li>
													
							<li className="UserName">
								<s className="UserScreenNameAt">{'@'}</s>
					            <b className="UserScreenName">{item.screen_name}</b> {' '}
					        { 
					        	notMyprofile === true ? 
							  	this.props.userRelationship.relationship.target.following === true ? <span className="FollowStatus">Follows you.</span> : null : null
							  	
							}
				            </li>
			            </ul>
		            	<div className="User-Description" dangerouslySetInnerHTML={createMarkup()}></div>
		            </div>
			    </div>
	            <div className="User-Connections">
	            	<div className="TweetsQtity">
		            	<a onClick={this.handleShow} className="User-Conn-Text">
		            		<span>Tweets</span>
		            		{this.formatCount(item.statuses_count)}
		            	</a>
	            	</div>
	            	<div className="Following">
	            		<a onClick={this.props.onFollowing} className="User-Conn-Text">
		            		<span>Following</span>
		            		{this.formatCount(item.friends_count)}
		            	</a>
	            	</div>
	            	<div className="Followers">
	            		<a onClick={this.props.onFollowers} className="User-Conn-Text">
		            		<span>Followers</span>
		            		{this.formatCount(item.followers_count)}
		            	</a>
	            	</div>
	            	<div className="Likes">
	            		<a onClick={this.props.showLikes} className="User-Conn-Text">
		            		<span>Likes</span>
		            		{this.formatCount(item.favourites_count)}
		            	</a>
	            	</div>
	            </div>
			</div> 
		); 
	}
}


export default Profile