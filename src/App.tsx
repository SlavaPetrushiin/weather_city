import React, { useEffect } from 'react'
import './App.css';
import CardCity from './components/CityCard/CardCity';
import Search from './components/SearchCity/Search';
import { useDispatch } from 'react-redux';
import { getLocalFavoritesCities } from './store/cities';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLocalFavoritesCities());
	}, [])

	let routes = (
		<Switch>
			<Route exact path='/' component={Search} />
			<Route exact path='/weather' component={CardCity} />
			<Redirect to="/" />
		</Switch>
	);

	return (
		<div className="App">
			<div className="container">
				<div className="weather">
					{routes}
				</div>
			</div>
    </div >
  );
}

export default App;

		