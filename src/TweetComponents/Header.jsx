import React from 'react'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
    }
    this.handleShowRT = this.handleShowRT.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    })
  }

  createTimestamp (time) {
    if (!time || !this.state.mounted) return null

    const parseTwitterDate = tdate => {
      let system_date = new Date(Date.parse(tdate))
      var user_date = new Date()

      let diff = Math.floor((user_date - system_date) / 1000)
      if (diff < 59) {return diff + "s"}
      if (diff <= 3540) {return Math.round(diff / 60) + "m"}
      if (diff <= 86400) {return Math.round(diff / 3600) + "h"}
      if (diff < 604800) {return Math.round(diff / 86400) + "d"}
      return system_date.toString().substring(4, 10)
    }

    return parseTwitterDate(time)
  }

  handleShowRT(e){
      this.props.onShow(this.props.item.user.screen_name);
  }

  handleShow(e){
    if(this.props.item.retweeted_status)
    {
      this.props.onShow(this.props.item.retweeted_status.user.screen_name);
    }else
    {
      this.props.onShow(this.props.item.user.screen_name);
    }
  }

  render () {
    let {item} = this.props
    const timestamp = this.createTimestamp(item.created_at)
    let isRT = false
    let Whoretweeted = ''
  
    if (item.retweeted_status) {
      Whoretweeted = item.user.name + ' Retweeted.'
      item = item.retweeted_status
      isRT = true
    }

    return (
      <div className="row Header">
        {isRT ? 
          <div style={{display: 'flex'}}><i className="mdi mdi-twitter-retweet WhoRetweeted-Icon" />
            <div 
              className="WhoRetweetedDiv" 
              style={{display: 'flex', justifyContent: 'flexStart', alignItems: 'center' }}>
              <a onClick={this.handleShowRT} className="WhoRetweeted-Url">{Whoretweeted}</a>
            </div>
          </div>
        : null}
        <a className="Account-Group" onClick={this.handleShow}>
      
          <strong className="Tweets-Fullname">{item.user.name}{' '}</strong>
      
          <span className="UserName">
            <s className="UserScreenNameAt">{'@'}</s>
            <b className="UserScreenName">{item.user.screen_name}</b>
          </span>
        </a>
        <small className="Tweets-Time">
          <a href={`http://twitter.com/${item.user.screen_name}/status/${item.id_str}`} className="Tweets-Timestamp">
            {' • '}{timestamp}
          </a>
        </small>
      </div>
    )
  }
}



export default Header