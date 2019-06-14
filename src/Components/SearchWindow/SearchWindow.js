import React from 'react';
import './SearchWindow.scss';

const SearchWindow = (props)  => {
	function searchHandler() {
		props.onShow(props.searchText);
	}
	const { searchText } = props;
	return (
  <div className="Searchbox">
    <span onClick={() => searchHandler()}>
			Buscar a @
      {searchText}
			.
    </span>
    <span>
			Buscar #
      {searchText}
      {' '}
			en tendencias.
    </span>
  </div>
	)
};

export default SearchWindow