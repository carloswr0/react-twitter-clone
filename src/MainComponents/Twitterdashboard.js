/*All required components and libraries*/
import React, {Component} from 'react';
import hello from 'hellojs';
import { client } from '../config.js'; 
import '../Style/TwitterStylesheet.scss';

import LittleLoader from            '../Components/LittleLoader/LittleLoader';
import AuthLoader from       '../Components/AuthLoader/AuthLoader';
import FollowersAndFollowings from  '../Components/FollowersAndFollowings/FollowersAndFollowings';
import Tweet from                   '../Components/TweetComponents/Tweet';
import NewTweet from                '../Components/NewTweet/NewTweet';
import Profile from                 '../Components/Profile/Profile';
import NavBar from                  '../Components/NavBar/NavBar'

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
      replyActive: false,
      replyIndex: 0,
    });
  }
   
  replyTweet(index){
    this.setState({
      replyActive: true,
      replyIndex: index,
    });
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

  followUserFromList(userId, userIndex){
    const _this = this;
    let useridentificator = userId;
    let userindex_var = userIndex;
    let usersArray = this.state.usersArray;  
    hello('twitter').api('friendships/create.json', 'POST', {'user_id' : useridentificator});
    //Ahora hay que conseguir la coordenada de quien segui o deje de seguir y cambiar justo ese estado de true a false o viceversa.
    usersArray[userindex_var].following = true;                        
    //Hasta aqui
    _this.forceUpdate()
  }

  unfollowUserFromList(userId, userIndex){
    const _this = this;
    let useridentificator = userId;
    let userindex_var = userIndex;
    let usersArray = this.state.usersArray;  
    hello('twitter').api('friendships/destroy.json', 'POST', {'user_id' : useridentificator});
    //Ahora hay que conseguir la coordenada de quien segui o deje de seguir y cambiar justo ese estado de true a false o viceversa.
    usersArray[userindex_var].following = false;                        
    //Hasta aqui
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
    const { replyIndex } = this.state;

    if (this.state.Authenticated === false) {
      return (
        <AuthLoader  
          onClick={this.authButtonClicked}
          isLoading={this.state.isLoadingAuth}
        />
      );
    }

    if (this.state.gotData && this.state.Authenticated && this.state.showingProfileList === true) {
      return (
        <div className="twitter-app"> 
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
            <React.Fragment>
              { this.state.usersArray.map((item, index) => (
                <FollowersAndFollowings  
                  key={item.id} 
                  item={item} 
                  index={index}
                  onShow={this.showProfile} 
                  followUser={this.followUserFromList}
                  unfollowUser={this.unfollowUserFromList}
                />
))}
            </React.Fragment>
          </div>
        </div> 
      );
    }

    if (this.state.gotData && this.state.Authenticated && this.state.showingProfileList === false) {
      return ( 
        <div className="twitter-app"> 
          <NavBar 
            ActiveNav={this.state.ActiveNav}
            loadingContent={this.state.loadingContent} 
            isGoingToSearch={this.state.isGoingToSearch}
            onMentions={this.requestMentions} 
            onHome={this.requestHomeTimeline}
            onSearch={this.searchTweets}
            showTypeaheadModal={this.showTypeaheadModal}
            onShow={this.showProfile}
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
              item={this.state.user} 
              onSubmit={this.postNewTweet}
            />
            <div>
              { this.state.data.map(item => (
                <Tweet
                  key={item.id}
                  item={item}
                  showProfile={this.showProfile}
                  likedTweetsArray={this.state.likedTweetsArray} 
                  sharedTweetsArray={this.state.sharedTweetsArray} 
                  likeTweet={this.likeTweet} 
                  replyTweet={this.replyTweet} 
                  shareTweet={this.shareTweet} 
                  replyIndex={replyIndex}
                  postNewTweet={this.postNewTweet} 
                  closeReplyTweet={this.closeReplyTweet}
                />
))}
            </div>
          </div>
        </div>
)
    } else {
      return (
        <LittleLoader />
      );
    }
  }  
}

export default Twitterdashboard;
