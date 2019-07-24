import React from 'react';
import twitterText from 'twitter-text';
import './Content.scss';

const Content = (props) => {
  let {item} = props, {text, entities} = item;
  
  // Removes any embedded media links.
  if (entities && entities.media) {
    entities.media.forEach( e => {
      text = text.replace(e.url, '')
    })
  }

  // Removes any quote links.
  if (entities && item.quoted_status) {
    entities.urls.forEach( u => {
      if (u.expanded_url.indexOf('/status/') > -1) {
        text = text.replace(u.url, '')
      }
    })
  }

  // Replaces and styles links and mentions.
  text = twitterText.autoLinkWithJSON(text, (entities || {}), {'usernameIncludeSymbol': true})
  text = text.replace(/href=/g, 'style="text-decoration: none;color:#6CCCF9;" href=')

  let tweetProps = {
    'className': 'content',
    'dangerouslySetInnerHTML': {
      '__html': text
    }
  }

  return (
    <p {... tweetProps} />
  );
}

export default Content
