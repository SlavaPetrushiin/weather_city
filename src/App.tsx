import React from 'react'
import './App.css';
import CardCity from './components/CityCard/CardCity';
import Search from './components/Search/Search';

function App() {
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

//					<CardCity />