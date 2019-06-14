import React from 'react';
import Repeat from '@material-ui/icons/Repeat';
import './Header.scss';
import { createTimestamp } from '../../../functions';

const Header = (props) => {
  function handleShowRT() {
    props.onShow(props.item.user.screen_name);
  }

  function handleShow() {
    if(props.item.retweeted_status) {
      props.onShow(props.item.retweeted_status.user.screen_name);
    } else {
      props.onShow(props.item.user.screen_name);
    }
  }

  let { item } = props;
  let isRT = false;
  let originalAuthor = '';
  
  if (item.retweeted_status) {
    originalAuthor = item.user.name + ' Retweeted.';
    item = {...item.retweeted_status};
    isRT = true;
  }

  return (
    <div className="Header">
      { isRT ? (
        <div className="Retweet-Group">
          <Repeat />
          <div>
            <button type="button" onClick={() => handleShowRT()}>{originalAuthor}</button>
          </div>
        </div>
        ) : null 
      }
      <div role="button" className="Account-Group" onClick={() => handleShow()}>
        <b>
          {item.user.name}
          {' '}
        </b>
        <span className="no-decoration">@</span>
        <span>{item.user.screen_name}</span>
        <time>
          {' • '}
          {createTimestamp(item.created_at)}
        </time>
      </div>
    </div>
  );
}

export default Header