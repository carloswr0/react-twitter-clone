import React from 'react'
import Reply from '@material-ui/icons/Reply';
import Repeat from '@material-ui/icons/Repeat';
import Favorite from '@material-ui/icons/Favorite';


class Footer extends React.Component {
  formatCount (count) {
    const readablize = num => {
      var e = Math.floor(Math.log(num) / Math.log(1000))
      return (num / Math.pow(1000, e)).toFixed(1) + 'K'
    }

    if (count > 999) return readablize(count)
    else return count
  }

  render () {
    const {item} = this.props
    const ActiveFav    = "Tweet-Action-Icon-Fav-Active"
    const NonActiveFav = "Tweet-Action-Icon-Fav"
    const ActiveRT     = "Tweet-Action-Icon-RT-Active"
    const NonActiveRT  = "Tweet-Action-Icon-RT"
    let favStyleString = '';
    let RTStyleString = '';
    let favCount = item.favorite_count;
    let RTCount = item.retweet_count;
    let FavsofAnRTCount = '';
    let likedTweetsArray = this.props.likedTweetsArray;
    let sharedTweetsArray = this.props.sharedTweetsArray;

    
    if (likedTweetsArray.indexOf(item.id_str) >= 0) {
      favStyleString = ActiveFav;
      favCount = favCount+1;
      FavsofAnRTCount = FavsofAnRTCount +1;
    }
    else{ favStyleString = NonActiveFav}

    if (sharedTweetsArray.indexOf(item.id_str) >= 0) {
      RTStyleString = ActiveRT;
      RTCount = RTCount+1;
    }
    else{ RTStyleString = NonActiveRT}
    
    if (item.retweeted_status){
      FavsofAnRTCount = item.retweeted_status.favorite_count
    }

    let id_str = this.props.item.id_str;

    return (
      <div className="row Footer">
        
          <div className="Tweet-Action" >
            <div className="Tweet-Action-Div" onClick={() => this.props.onReply(id_str)}>
              <Reply className="Tweet-Action-Icon-Reply" />
            </div>
          </div>

          <div className="Tweet-Action">
            <div className="Tweet-Action-Div" onClick={() => this.props.onRT(id_str)} >
              <Repeat className={`${RTStyleString}`} />
            </div>           
            <div className="Tweet-Action-Count">
              {RTCount > 0 ? this.formatCount(RTCount) : ' '}
            </div>
          </div>

          <div className="Tweet-Action">
            <div className="Tweet-Action-Div" onClick={() => this.props.onFav(id_str)}>
              <Favorite className={`${favStyleString}`} />
            </div>
            <div className="Tweet-Action-Count">
              {
                item.retweeted_status ? 
                this.formatCount(FavsofAnRTCount) 
                :
                favCount > 0 ?
                this.formatCount(favCount)
                :
                ' ' 
              }
            </div>          
          </div>
      </div>
    )
  }
}


export default Footer