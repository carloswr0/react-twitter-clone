import React from 'react';
import './OptionsMenu.scss';

const OptionsMenu = (props) => {
	const { logout } = props;
	return (
  <div className="animated fadeIn dropdown-options">
    <b role="button" onClick={logout}>Logout</b>
  </div>
  )
}

export default OptionsMenu