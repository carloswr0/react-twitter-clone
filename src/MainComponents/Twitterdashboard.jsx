/*All required components and libraries*/
import React, {Component} from 'react';
import hello from 'hellojs';
import {client} from '../config.js'; 
import '../Style/TwitterStylesheet.css';

import Loader from                  '../Components/LittleLoader.jsx';
import SocialLoginLoader from       '../Components/SocialLoginLoader.jsx';
import Auth from                    './Auth.jsx';
import FollowersAndFollowings from  '../Components/FollowersAndFollowings.jsx';
import Footer from                  '../TweetComponents/Footer.jsx';
import Header from                  '../TweetComponents/Header.jsx';
import Text from                    '../TweetComponents/Text.jsx';
import NewTweet from                '../Components/NewTweet.jsx';
import Profile from                 '../Components/Profile.jsx';
import NavBar from                  '../Components/NavBar.jsx'
import Reply from                   '../Components/Reply.jsx';
import ProfilePic from              '../TweetComponents/ProfilePic.jsx';

// setting up a global variable to store loged user name for future requests.
var logedUserName = '';

const initialState = {
  data: [],
  user: {},
  usersArray: [],
  gotData: false,
  logedUserObject : '',
  Authenticated: false,
  ActiveNav: '',
  loadingContent: false,
  likedTweetsArray: [],
  sharedTweetsArray: [],
  replyActive: false,
  replyIndex: 0,
  showingProfileList: false,
  userRelationship: {},
  isGoingToSearch: false,
  isLoadingAuth: false,
  isOptionsOpen: false,
};

class Twitterdashboard extends Component { 

  constructor(props){
    super(props);
    this.state = initialState;
    this.requestHomeTimeline = this.requestHomeTimeline.bind(this);
    this.requestMentions = this.requestMentions.bind(this);
    this.changeContact = this.changeContact.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfo_noInit = this.getUserInfo_noInit.bind(this);
    this.searchTweets = this.searchTweets.bind(this);
    this.postNewTweet = this.postNewTweet.bind(this);   
    this.requestAccessToken = this.requestAccessToken.bind(this);
    this.revokeAccessToken = this.revokeAccessToken.bind(this);
    this.likeTweet = this.likeTweet.bind(this);
    this.shareTweet = this.shareTweet.bind(this);
    this.replyTweet = this.replyTweet.bind(this);
    this.closeReplyTweet = this.closeReplyTweet.bind(this);
    this.showProfile = this.showProfile.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
    this.showFollowings = this.showFollowings.bind(this);
    this.showLikes = this.showLikes.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.followUserFromList = this.followUserFromList.bind(this);
    this.unfollowUserFromList = this.unfollowUserFromList.bind(this);
    this.showTypeaheadModal = this.showTypeaheadModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.authButtonClicked = this.authButtonClicked.bind(this);
    this.optionsToggle = this.optionsToggle.bind(this);
  }

  componentDidMount() {
    const _this = this;
    _this.getUserInfo(); //hacer getinfo CON INIT
  }

  componentWillReceiveProps(nextProps){

  }

  resetState() {
    this.setState(initialState);
  }

  getUserInfo(){
    const _this = this; 
    const selectedUser = "carloswilthew"; 
    
    hello.init({
    twitter: client.options.consumer_key,
    }, {
      redirect_uri: 'redirect.html',
    });

    hello.on('auth.login', function(auth) {
      hello(auth.network).api('me')
      .then(function(logedProfile) {
        hello('twitter').api('friendships/show.json', 'GET', {'source_screen_name': logedProfile.screen_name, 'target_screen_name': selectedUser })
        .then(function(userRelationship) {
          hello('twitter').api('statuses/user_timeline.json', 'GET', {'screen_name': selectedUser})
          .then(function(tweets) {  
            hello('twitter').api('users/show.json', 'GET', {'screen_name': selectedUser})
            .then(function(selectedUserProfile) {
                _this.setState({
                Authenticated: true, 
                logedUserObject: logedProfile, 
                userRelationship: userRelationship, 
                data: tweets.data, 
                user: selectedUserProfile, 
                showingProfileList: false, 
                gotData: true,
              });
            }, error => console.log(error));
          }, error => console.log(error));
        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error)); 
  }

  optionsToggle(){
    this.setState({
      isOptionsOpen: !this.state.isOptionsOpen,
    });
  }

  getUserInfo_noInit(){
    const _this = this; 
    const selectedUser = this.props.ContactActive.twitter; 

    hello('twitter').api('me')
    .then(function(logedProfile) {
      hello('twitter').api('friendships/show.json', 'GET', {'source_screen_name': logedProfile.screen_name, 'target_screen_name': selectedUser })
      .then(function(userRelationship) {
        hello('twitter').api('statuses/user_timeline.json', 'GET', {'screen_name': selectedUser})
        .then(function(tweets) {  
          hello('twitter').api('users/show.json', 'GET', {'screen_name': selectedUser})
          .then(function(selectedUserProfile) {
              _this.setState({
              Authenticated: true, 
              logedUserObject: logedProfile, 
              userRelationship: userRelationship, 
              data: tweets.data, 
              user: selectedUserProfile, 
              showingProfileList: false, 
              gotData: true,
              loadingContent: false,
            });
          }, error => console.log(error));
        }, error => console.log(error));
      }, error => console.log(error));
    }, error => console.log(error));
  }

  changeContact(){
    const _this = this; 
    const selectedUser = this.props.ContactActive.twitter;

    this.setState({loadingContent: true });
    hello('twitter').api('me')
    .then(function(logedProfile) {
      hello('twitter').api('friendships/show.json', 'GET', {'source_screen_name': logedProfile.screen_name, 'target_screen_name': selectedUser })
      .then(function(userRelationship) {
        hello('twitter').api('statuses/user_timeline.json', 'GET', {'screen_name': selectedUser})
        .then(function(tweets) {  
          hello('twitter').api('users/show.json', 'GET', {'screen_name': selectedUser})
          .then(function(selectedUserProfile) {
            _this.setState({
              Authenticated: true, 
              logedUserObject: logedProfile, 
              userRelationship: userRelationship, 
              data: tweets.data, 
              user: selectedUserProfile, 
              showingProfileList: false, 
              gotData: true,
            });
          });
        });
      });
    });
    setTimeout(() => {
    this.setState({ loadingContent: false}); }, 2000);
  }

  requestAccessToken(){
    hello('twitter').login()
  }

  authButtonClicked(){
    this.setState({
      isLoadingAuth: true,
    });
    this.requestAccessToken();
  }


  revokeAccessToken(){
    hello('twitter').logout()
    this.resetState();
  }

  requestHomeTimeline() {
    const _this = this; 
    this.setState({loadingContent: true , replyModalActive: false, ActiveNav: 'home'});
    logedUserName = this.state.logedUserObject.screen_name;
    
    hello('twitter').api('statuses/home_timeline.json', 'GET')
    .then(function(tweets, error) {
      hello('twitter').api('users/show.json', 'GET', {'screen_name': logedUserName})
      .then(function(selectedUserProfile){
        if(error) throw error;
        _this.setState({
          user: selectedUserProfile, 
          data: tweets.data,
          gotData: true, 
          showingProfileList: false, 
          userRelationship: {}
        });
      });
    });
    
    setTimeout(() => {
    this.setState({ loadingContent: false}); }, 2000);
  }

  requestMentions() {
    const _this = this; 
    this.setState({loadingContent: true , replyModalActive: false, ActiveNav: 'notifications'});
    logedUserName =  this.state.logedUserObject.screen_name
    
    hello('twitter').api('statuses/mentions_timeline.json', 'GET')
    .then(function(tweets, error) {
      hello('twitter').api('users/show.json', 'GET', {'screen_name': logedUserName})
      .then(function(selectedUserProfile){
        if(error) throw error;
        _this.setState({
          user: selectedUserProfile, 
          data: tweets.data,
          gotData: true, 
          showingProfileList: false, 
          userRelationship: {}
        });
      });
    });
    setTimeout(() => {
    this.setState({ loadingContent: false}); }, 2000);
  }

  showLikes() {
    const _this = this; 
    if (this.state.user.screen_name === this.state.logedUserObject.screen_name) {
      hello('twitter').api('favorites/list.json', 'GET')
      .then(function(response) {
        _this.setState({data: response.data, showingProfileList: false, gotData: true});
        console.log(response.data);
        });
    } else {
       hello('twitter').api('favorites/list.json', 'GET', {'screen_name' : this.state.user.screen_name})
       .then(function(response) {
        _this.setState({data: response.data, showingProfileList: false, gotData: true});
        console.log(response.data);
      });
    }
  }

  showProfile(userStr){
    const _this = this; 
    const selectedUser = userStr;
    this.setState({isGoingToSearch: false});
    if(userStr){
      this.setState({loadingContent: true});
      hello('twitter').api('friendships/show.json', 'GET', {'source_screen_name': this.state.logedUserObject.screen_name, 'target_screen_name': selectedUser })
      .then(function(response) {
        hello('twitter').api('statuses/user_timeline.json', 'GET', {'screen_name': selectedUser})
        .then(function(tweets) {
          hello('twitter').api('users/show.json', 'GET', {'screen_name': selectedUser})
          .then(function(selectedUserProfile) {
            _this.setState({
              user: selectedUserProfile, 
              gotData: true, 
              showingProfileList: false, 
              userRelationship: response, 
              data: tweets.data, 
              ActiveNav: '',
            });
          });
        });
      }, function(error){
        console.log('Ha ocurrido un error cargando la relacion entre los usuarios.');
      });

      setTimeout(() => {
      this.setState({ loadingContent: false}); }, 2000);
    }
  }

  showFollowers(){
    const _this = this; 
    if (this.state.user.screen_name === this.state.logedUserObject.screen_name) {
      hello('twitter').api('followers/list.json', 'GET')
      .then(function(response) {
        _this.setState({usersArray: response.users, showingProfileList: true, gotData: true});
      });
    } else {
      hello('twitter').api('followers/list.json', 'GET', {'screen_name' : this.state.user.screen_name})
      .then(function(response) {
        _this.setState({usersArray: response.users, showingProfileList: true, gotData: true});     
      });
    }
  }

  showFollowings(){
    const _this = this; 
    if (this.state.user.screen_name === this.state.logedUserObject.screen_name) {
      hello('twitter').api('friends/list.json', 'GET')
      .then(function(response) {
        _this.setState({usersArray: response.users, showingProfileList: true, gotData: true}); 
      });
    } else {
      hello('twitter').api('friends/list.json', 'GET', {'screen_name' : this.state.user.screen_name})
      .then(function(response) {
        _this.setState({usersArray: response.users, showingProfileList: true, gotData: true});
      });
    }
  }

  postNewTweet(value) {
    const _this = this; 
    hello('twitter').api('me/share', 'POST', {message : value,});
    _this.setState({gotData: false});
    this.requestHomeTimeline();
    _this.setState({gotData: true, replyIndex: ""});
  }

  searchTweets(item) {
    const _this = this; 
    this.setState({loadingContent: true ,isGoingToSearch: false});

    hello('twitter').api('search/tweets.json', 'GET', {q: item, lang: 'es'})
    .then(function(response) {
      _this.setState({
        data: response.statuses,
        ActiveNav: '',
        gotData: true, 
        showingProfileList: false,
      });

    });
    setTimeout(() => {
    this.setState({ loadingContent: false}); }, 2000);
  }

  likeTweet(e){
    hello('twitter').api('me/like', 'POST', {id : e});
    let favedtweet_id = e;
    this.setState(previousState => ({
      likedTweetsArray: [...previousState.likedTweetsArray, favedtweet_id]
    }));
  }

  shareTweet(e){
    hello('twitter').api('me/share', 'POST', {id : e});
    let retweetedtweet_id = e;
    this.setState(previousState => ({
      sharedTweetsArray: [...previousState.sharedTweetsArray, retweetedtweet_id]
    }));
  }

  closeReplyTweet () {
    this.setState({
      'replyActive': 
      false,
      'replyIndex': 0,
    })
  }
   
  replyTweet(e){
    this.setState({
      'replyActive': true,
      'replyIndex': e,
    })
  }

  followUser(event){
    const _this = this;
    let userRelationship = this.state.userRelationship;  
    hello('twitter').api('friendships/create.json', 'POST', {'user_id' : this.state.user.id_str});
    userRelationship.relationship.target.followed_by = true;                        
    _this.setState({userRelationship});
    event.preventDefault()
    _this.forceUpdate()
  }

  unfollowUser(event){
    const _this = this;
    let userRelationship = this.state.userRelationship;  
    hello('twitter').api('friendships/destroy.json', 'POST', {'user_id' : this.state.user.id_str});
    userRelationship.relationship.target.followed_by = false;                        
    _this.setState({userRelationship});
    event.preventDefault()
    _this.forceUpdate()
  }

  followUserFromList(userId, userIndex, e){
    const _this = this;
    let useridentificator = userId;
    let userindex_var = userIndex;
    let usersArray = this.state.usersArray;  
    hello('twitter').api('friendships/create.json', 'POST', {'user_id' : useridentificator});
    //Ahora hay que conseguir la coordenada de quien segui o deje de seguir y cambiar justo ese estado de true a false o viceversa.
    usersArray[userindex_var].following = true;                        
    //Hasta aqui
    e.preventDefault();
    _this.forceUpdate()
  }

  unfollowUserFromList(userId, userIndex, e){
    const _this = this;
    let useridentificator = userId;
    let userindex_var = userIndex;
    let usersArray = this.state.usersArray;  
    hello('twitter').api('friendships/destroy.json', 'POST', {'user_id' : useridentificator});
    //Ahora hay que conseguir la coordenada de quien segui o deje de seguir y cambiar justo ese estado de true a false o viceversa.
    usersArray[userindex_var].following = false;                        
    //Hasta aqui
    e.preventDefault();
    _this.forceUpdate()
  }

  showTypeaheadModal(searchKeyword){
    const _this = this;
    if(searchKeyword.length > 0){      
    _this.setState({
      'isGoingToSearch': true,
    });
    }else{
    _this.setState({
      'isGoingToSearch': false,
    });
    }
  }

  render() { 
    const { replyIndex} = this.state;
    if (this.props.changeContactFlag){
      this.props.commCenterHomeState();
      this.changeContact();
    }
    /*
      Alright, render() works this way, there are three conditionals in this.state; Authenticated verifies
      if the current user has logged in, gotData verifies if the incoming requested data has completely
      loaded and showingProfileList verifies if you want to show Tweets or Followers/Followings in the 
      dashboard.
      
      e.g:

      **  if(this.state.Authenticated === false){
      **    console.log('Shows authentication screen');
      **  }
      **  if(this.state.gotData && this.state.Authenticated && this.state.showingProfileList === true){
      **    console.log('Shows profile + followers');
      **  }
      **  if (this.state.gotData && this.state.Authenticated && this.state.showingProfileList === false){
      **    console.log('Shows profile + tweets');
      **  }
      **  else{
      **    console.log('Shows loading screen');
      **  }
      **  return('What am i showing');

    */

    if(this.state.Authenticated === false)
    {
      return (
        <SocialLoginLoader  
          socialIcon={"mdi mdi-twitter"}
          onClick={this.authButtonClicked}
          isLoading={this.state.isLoadingAuth}
        />);
    }

    if(this.state.gotData && this.state.Authenticated && this.state.showingProfileList === true){
      return(
      <div className="container-fluid TwitterModule"> 
        <NavBar 
          ActiveNav={this.state.ActiveNav}
          onMentions={this.requestMentions} 
          onHome={this.requestHomeTimeline}
          onSearch={this.searchTweets}
          loadingContent={this.state.loadingContent} 
          onShow={this.showProfile}
          isGoingToSearch={this.state.isGoingToSearch}
          logout={this.revokeAccessToken} 
        />
        <div className="twitter-content">
          <Profile 
            item={this.state.user} 
            logedUserObject={this.state.logedUserObject}
            loadingContent={this.state.loadingContent} 
            ActiveNav={this.state.ActiveNav} 
            onMentions={this.requestMentions} 
            onHome={this.requestHomeTimeline} 
            onSearch={this.searchTweets}
            onFollowers={this.showFollowers}
            onFollowing={this.showFollowings}
            onShow={this.showProfile}
            showLikes={this.showLikes}
            followUser={this.followUser}
            unfollowUser={this.unfollowUser}
            userRelationship={this.state.userRelationship}
            showTypeaheadModal={this.showTypeaheadModal}
            isGoingToSearch={this.state.isGoingToSearch}
            usersArray={this.state.usersArray}
            logout={this.revokeAccessToken}
            isOptionsOpen={this.state.isOptionsOpen}
            optionsToggle={this.optionsToggle}
          />
          <div className="tweets-container">
            { this.state.usersArray.map((item, index) => 
            //Div que encierra todo el elemento del TWEET
              <div key={item.id} className="row EveryUser"> 
                  <FollowersAndFollowings 
                    item={item} 
                    index={index}
                    onShow={this.showProfile} 
                    followUser={this.followUserFromList}
                    unfollowUser={this.unfollowUserFromList}/>
              </div> 
            )}
          </div>
        </div>
      </div> 
      );
    }

    if(this.state.gotData && this.state.Authenticated && this.state.showingProfileList === false){
      return ( 
      <div className="TwitterModule"> 
        <NavBar 
          ActiveNav={this.state.ActiveNav}
          onMentions={this.requestMentions} 
          onHome={this.requestHomeTimeline}
          onSearch={this.searchTweets}
          showTypeaheadModal={this.showTypeaheadModal}
          loadingContent={this.state.loadingContent} 
          onShow={this.showProfile}
          isGoingToSearch={this.state.isGoingToSearch}
          logout={this.revokeAccessToken} 
        />
        <div className="twitter-content">
          <Profile 
            item={this.state.user} 
            logedUserObject={this.state.logedUserObject}
            loadingContent={this.state.loadingContent} 
            ActiveNav={this.state.ActiveNav} 
            onMentions={this.requestMentions} 
            onHome={this.requestHomeTimeline} 
            onSearch={this.searchTweets}
            onFollowers={this.showFollowers}
            onFollowing={this.showFollowings}
            onShow={this.showProfile}
            showLikes={this.showLikes}
            followUser={this.followUser}
            unfollowUser={this.unfollowUser}
            userRelationship={this.state.userRelationship}
            isGoingToSearch={this.state.isGoingToSearch}
            usersArray={this.state.usersArray}
            logout={this.revokeAccessToken}
            isOptionsOpen={this.state.isOptionsOpen}
            optionsToggle={this.optionsToggle}
          />
          <NewTweet 
            logedUserItem={this.state.logedUserObject} 
            ref={input1 => this.input1 = input1} 
            item={this.state.user} 
            onSubmit={this.postNewTweet}
          />
          <div className="tweets-container">
            { this.state.data.map(item => 
              <div key={item.id} className="row Tweet" onClick={this.OpenTweetModal}> 
                <div className="tweetTransparency">
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 profilePicture">
                    <ProfilePic 
                      item={item}
                      onShow={this.showProfile}
                    />
                  </div>
                  <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 Content">
                    <Header 
                      item={item} 
                      onShow={this.showProfile}
                    />
                    <Text item={item}/>
                    <Footer 
                      likedTweetsArray={this.state.likedTweetsArray} 
                      sharedTweetsArray={this.state.sharedTweetsArray} 
                      item={item} onFav={this.likeTweet} 
                      onReply={this.replyTweet} 
                      onRT={this.shareTweet} 
                    />
                    <Reply 
                      ref={input1 => this.input1 = input1} 
                      item={item} 
                      replyIndex={replyIndex}
                      onSubmit={this.postNewTweet} 
                      closeReplyTweet={this.closeReplyTweet}
                    />
                  </div>
                </div>
              </div> 
            )}
          </div>
        </div>
      </div> 
    );
    }else{
      return(
        <Loader />
      )
    }
  }  
}



export default Twitterdashboard;