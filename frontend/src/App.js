import React from 'react';
import Navigation from './Navigation';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const App = () => {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes />
		</BrowserRouter>
	);
};

export default App;
