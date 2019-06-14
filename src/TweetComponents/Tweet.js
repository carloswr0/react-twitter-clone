import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Content from './Content/Content';
import ProfilePic from './Thumbnail/ProfilePic';
import Reply from '../Reply/Reply';
import './Tweet.scss';

const Tweet = (props) => {
  const {item, showProfile, likedTweetsArray, sharedTweetsArray, replyTweet, likeTweet, shareTweet, postNewTweet, replyIndex, closeReplyTweet} = props;
  return (
    <div className="Tweet">
      <div className="overlay">
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <ProfilePic 
            item={item}
            onShow={showProfile}
          />
        </div>
        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
          <Header 
            item={item} 
            onShow={showProfile}
          />
          <Content item={item} />
          <Footer 
            likedTweetsArray={likedTweetsArray} 
            sharedTweetsArray={sharedTweetsArray} 
            item={item}
            onFav={likeTweet} 
            onReply={replyTweet} 
            onRT={shareTweet} 
          />
          <Reply 
            item={item} 
            replyIndex={replyIndex}
            onSubmit={postNewTweet} 
            closeReplyTweet={closeReplyTweet}
          />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
