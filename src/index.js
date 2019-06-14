import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import TwitterDashboard from './MainComponents/Twitterdashboard'
import './index.css';

ReactDOM.render(<TwitterDashboard />, document.getElementById('root'));
registerServiceWorker();
