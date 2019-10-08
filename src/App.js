import React from 'react';
import './App.css';
import Background from './Components/Background';
import SiteHeader from './Components/SiteHeader';
import Profile from './Components/Profile';
import DataRef from './Components/DataRef';
import InfoCard from './Components/InfoCard';
import { Provider } from 'react-redux';

import store from './store';

function App() {
  return (
	<div className="topLevel">
		<Provider store={store}>
			<DataRef />
		    <div className="App">
		    	<Background />
		    	<SiteHeader />
		    	<Profile />
		    	<InfoCard />
		    </div>
	    </Provider>
    </div>
  );
}

export default App;
