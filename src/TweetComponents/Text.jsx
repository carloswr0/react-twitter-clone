import React from 'react';
import twemoji from 'twemoji';
import twitterText from 'twitter-text';

class Text extends React.Component {
  render () {
    //SE RECIBE EL TEXT CRUDO
    let {item} = this.props, {text, entities} = item


    // remove any embedded media links
    if (entities && entities.media) {
      entities.media.forEach( e => {
        text = text.replace(e.url, '')
      })
    }
    
    // remove any quote links
    if (entities && item.quoted_status) {
      entities.urls.forEach( u => {
        if (u.expanded_url.indexOf('/status/') > -1) {
          text = text.replace(u.url, '')
        }
      })
    }

    //replace and style links and mentions
    text = twitterText.autoLinkWithJSON(text, (entities || {}), {'usernameIncludeSymbol': true})
    text = text.replace(/href=/g, 'style="text-decoration: none;color:#6CCCF9;" href=')
    
    //replace and style emojis
    text = twemoji.parse(text)
    text = text.replace(/<img class="emoji"/g, '<img class="emoji" style="height:14px;margin-right:5px;"')
    // browsers add http which causes isomorphic rendering probs
    text = text.replace(/src="\/\/twemoji/g, 'src="http://twemoji')


    let tweetProps = {
      'className': 'Tweet-Text',
      'dangerouslySetInnerHTML': {
        '__html': text
      }
    }

    return <p className="row TweetText" {... tweetProps} />
  }
}


export default Text
