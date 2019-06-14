import React, {Component} from 'react';
import './NavBar.scss';

import NotificationsNone from '@material-ui/icons/NotificationsNone';
import Search from '@material-ui/icons/Search';
import Home from '@material-ui/icons/Home';
import SearchWindow from '../SearchWindow/SearchWindow';

class NavBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchText: "",
		};
	}
	onInputEnter(e) {
		const { onSearch } = this.props;
    if (e.key === 'Enter' && e.target.value) {
      let item = e.target.value;
      // Now add it to the 'items' array state
      onSearch(item);
      // On enter, remove the value from the input
			e.target.value = '';
			e.preventDefault();
      this.setState({searchText: ""});
    }
  }
  //Funcion de agregar con el evento por presionar el Icono
  onIconPress() {   
		const { onSearch } = this.props;
		const { searchText } = this.state;
    if (searchText.length > 0){
      // Now add it to the 'items' array state
      onSearch(searchText);
      // On enter, remove the value from the input
      this.input.value = '';
      this.setState({searchText: ""});
    }
	}
  handleChange(event) {
		const { showTypeaheadModal } = this.props;
    let input = event.target.value;
    this.setState({
        searchText : (input)
    });
		showTypeaheadModal(input);
  }
	render() {
		const { ActiveNav, onHome, onMentions, isGoingToSearch, onShow } = this.props;
		const { searchText } = this.state;
		let activeMenuStyle1 = {}					
		let activeMenuStyle2 = {}

		if (ActiveNav === 'home') {
			activeMenuStyle1 = {
				'borderBottom': '3px solid rgb(255, 82, 82)',
			}
			activeMenuStyle2 = {}
		}
		if (ActiveNav === 'notifications') {
			activeMenuStyle2 = {
				'borderBottom': '3px solid rgb(255, 82, 82)',
			}
			activeMenuStyle1 = {}
		}	
		return (
  <div className="Navbar">
    <div className="home" style={activeMenuStyle1} onClick={() => onHome()}>
      <Home />
      <div className="Twitter-Profile-Navigation-Text">
				Home
      </div> 
    </div>
    <div className="notifications" style={activeMenuStyle2} onClick={() => onMentions()}>
      <NotificationsNone />
      <div className="Twitter-Profile-Navigation-Text">
				Notifications
      </div> 
    </div>
    <svg className="twitter-logo" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
    <div className="search-container">
      <form onKeyPress={(e) => this.onInputEnter(e)}> 
        <input
          type="text"
          placeholder="Buscar en Twitter"
          onChange={(e) => this.handleChange(e)}
          ref={input => this.input = input}
          maxLength="30"
        />
      </form>
      { 
        isGoingToSearch ? (
          <SearchWindow 
            searchText={searchText}
            onShow={() => onShow()}
            clearSearchText={this.clearSearchText}
          />
        ) : 
				null
			}	
    </div>
    <Search 
      className="search-icon" 
      onClick={() => this.onIconPress()}
    />
  </div>
		);
	}
}

export default NavBar