import React, { useEffect } from 'react'
import './App.css';
import CardCity from './components/CityCard/CardCity';
import Search from './components/SearchCity/Search';
import { useDispatch } from 'react-redux';
import { getLocalFavoritesCities } from './store/cities';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLocalFavoritesCities());
	}, [])

	return (
		<div className="App">
			<div className="container">
				<div className="weather">
					<Search />
				</div>
			</div>
    </div >
  );
}

export default App;

//						<CardCity />				