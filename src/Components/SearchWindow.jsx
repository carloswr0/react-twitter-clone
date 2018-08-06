import React, {Component} from 'react'

class SearchWindow extends Component {

	constructor(props){
    super(props);
    this.state = {}
    this.searchHandler = this.searchHandler.bind(this);
	}
	
	searchHandler(){
		this.props.onShow(this.props.searchText);
		this.props.profileState({searchText: ""});
	}

	render(){
		
		
	return(
			<div className="TypeAheadModal">
				<div className="dropdown-menu-top-section">
					<span className="TypeAheadModal-Li" onClick={this.searchHandler}>Buscar a @{this.props.searchText}.</span>
					<span className="TypeAheadModal-Li">Buscar #{this.props.searchText} en tendencias.</span>
				</div>
	      	</div>
      	)
	}
}

export default SearchWindow