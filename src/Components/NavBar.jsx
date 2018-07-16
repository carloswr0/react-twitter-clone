import React, {Component} from 'react';
import LittleLoader from './LittleLoader.jsx';
import SearchWindow from '../Components/SearchWindow.jsx';

import NotificationsNone from '@material-ui/icons/NotificationsNone';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Language from '@material-ui/icons/Language';
import Search from '@material-ui/icons/Search';
import Home from '@material-ui/icons/Home';

class NavBar extends Component {
	constructor(props){
		super(props);
		this.state = {

		};
		
	}

	render(){

		let activeMenuStyle1 = {}					
			let activeMenuStyle2 = {}

			if (this.props.ActiveNav === 'home')
			{
				activeMenuStyle1 = {
					'borderBottom': '3px solid rgb(255, 82, 82)',
				}
				activeMenuStyle2 = {}
			}
			if (this.props.ActiveNav === 'notifications')
			{
				activeMenuStyle2 = {
					'borderBottom': '3px solid rgb(255, 82, 82)',
				}
				activeMenuStyle1 = {}
			}
		
		return(
			<div className="Twitter-Profile-Navbar">
				<div className="Home" style={activeMenuStyle1} onClick={this.props.onHome}>
					<Home className="Twitter-Profile-Navigation-Icon"/>
					<a className="Twitter-Profile-Navigation-Text">
						Home
					</a> 
				</div>
				<div className="Notifications" style={activeMenuStyle2} onClick={this.props.onMentions}>
					<NotificationsNone className="Twitter-Profile-Navigation-Icon"/>
					<a className="Twitter-Profile-Navigation-Text">
						Notifications
					</a> 
				</div>
				{
					this.props.loadingContent ? 
					<LittleLoader /> : 
					<Language className="Twitter-Logo"/>
				}
				{
					this.props.isGoingToSearch ? 
					<SearchWindow 
						profileState={this.profileState}
						searchText={this.state.searchText}
						onShow={this.props.onShow}
						clearSearchText={this.clearSearchText}
					/> : 
					null
				}				
				<div className="Search-Tweets">
					<form id="Search-Tweets-Form" onKeyPress={this.onInputEnter}> 
						<input className="Search-Tweets-Input"
							type="text"
							placeholder="Buscar en Twitter"
							onChange={this.handleChange}
							ref={input => this.input = input}
                       		maxLength="30"
						/>
					</form>
				</div>
				<Search 
					className="Search-Tweets-Button" 
					onClick={this.onIconPress}
				/>
			</div>
		);
	}
}

export default NavBar