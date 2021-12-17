import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Table from './components/Table';
import Map from './components/Map';
import About from './components/About';
import DetailTable from './components/DetailTable';

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/">
				<Map />
			</Route>
			<Route path="/about">
				<About />
			</Route>
			<Route path="/table">
				<Table />
			</Route>
			<Route path="/plan/:planId" children={<DetailTable />}/>
			<Route path="/">
				<Redirect to="/" />
			</Route>
		</Switch>
	);
};

export default Routes;
