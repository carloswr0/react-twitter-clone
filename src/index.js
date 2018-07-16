import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import TwitterDashboard from './MainComponents/Twitterdashboard.jsx'

ReactDOM.render(<TwitterDashboard />, document.getElementById('root'));
registerServiceWorker();
