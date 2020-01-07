import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Discover from './Discover';
import Favorites from './Favorites';
import MyRated from './MyRated';
import MoviePage from './MoviePage';
import ResultPage from './ResultPage';

class Controller extends React.Component {
    constructor(props) {
        super(props);
      }

      componentDidMount(){
        let favoritesArray = []
        localStorage.setItem('favorites', JSON.stringify(favoritesArray))
      }

      render(){
          return (
            <div> 
             <Router>
	         	<div>
				<Route path="/" exact> <Home /> </Route>
				<Route path="/about"> <About /> </Route>
				<Route path="/discover"> <Discover /> </Route>
				<Route path="/favorites"> <Favorites /> </Route>
        <Route path="/ratings"> <MyRated /> </Route>
        <Route path="/movie/:id"  component={MoviePage} /> 
        <Route path="/search/:id"  component={ResultPage} /> 
	        	</div>
	         </Router>
            </div>
          )
      }
    }

export default Controller;