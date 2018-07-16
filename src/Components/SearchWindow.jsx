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
		        <div className="header-nav header-nav-options">
					<li className="dropdown hidden-xs open">
						<ul className="dropdown-menu animation-expand">
							<div className="dropdown-menu-top-section">
								<li className="TypeAheadModal-Li" onClick={this.searchHandler}>Buscar a @{this.props.searchText}.</li>
								<li className="TypeAheadModal-Li">Buscar #{this.props.searchText} en tendencias.</li>
							</div>
						</ul>
					</li>
				</div>
	      	</div>
      	)
	}
}

export default SearchWindow