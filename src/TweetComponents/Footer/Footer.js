import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Repeat from '@material-ui/icons/Repeat';
import Favorite from '@material-ui/icons/Favorite';
import './Footer.scss';
import { formatCount } from '../../../functions';

const Footer = (props) => {
  const { item, likedTweetsArray, sharedTweetsArray} = props;
  const activeFav    = "Favorite-Active"
  const nonActiveFav = "Favorite"
  const activeRT     = "Retweet-Active"
  const nonActiveRT  = "Retweet"
  let fav = '';
  let rt = '';
  let favCount = item.favorite_count;
  let RTCount = item.retweet_count;
  let FavsofAnRTCount = '';

  // If tweet its found either in liked or shared tweets array; +1 and gives proper styling.
  if (likedTweetsArray.indexOf(item.id_str) >= 0) {
    fav = activeFav;
    favCount = favCount+1;
    FavsofAnRTCount = FavsofAnRTCount +1;
  } else { 
    fav = nonActiveFav;
  }

  if (sharedTweetsArray.indexOf(item.id_str) >= 0) {
    rt = activeRT;
    RTCount = RTCount+1;
  } else { 
    rt = nonActiveRT;
  }
  
  // If tweets it's a retweet we shall use the original tweet's likes.
  if (item.retweeted_status) {
    FavsofAnRTCount = item.retweeted_status.favorite_count;
  }

  // Sets Tweet's ID on parent component.
  let id_str = item.id_str;

  return (
    <div className="Footer">
      <div className="Interactions">
        <div role="button" onClick={() => props.onReply(id_str)}>
          <ArrowBack className="Reply" />
        </div>
        <div className="Tweet-Action-Count">
          Reply
        </div>
      </div>
      <div className="Interactions">
        <div role="button" onClick={() => props.onRT(id_str)}>
          <Repeat className={`${rt}`} />
        </div>           
        <div className="Tweet-Action-Count">
          { RTCount > 0 ? formatCount(RTCount) : 'Share' }
        </div>
      </div>
      <div className="Interactions">
        <div role="button" onClick={() => props.onFav(id_str)}>
          <Favorite className={`${fav}`} />
        </div>
        <div className="Tweet-Action-Count">
          { item.retweeted_status ? formatCount(FavsofAnRTCount) : favCount > 0 ? formatCount(favCount) : 'Like' }
        </div>          
      </div>
    </div>
  );
}


export default Footer