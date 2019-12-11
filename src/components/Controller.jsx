import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import Discover from './Discover';
import Favorites from './Favorites';
import MyRated from './MyRated';

class Controller extends React.Component {
    constructor(props) {
        super(props);
      }

      render(){
          return (
            <div> 
                <h1> Controller </h1>
             <Router>
	         	<div>
				<Route path="/" exact> <Home /> </Route>
				<Route path="/about"> <About /> </Route>
				<Route path="/discover"> <Discover /> </Route>
				<Route path="/favorites"> <Favorites /> </Route>
                <Route path="/ratings"> <MyRated /> </Route>
	        	</div>
	         </Router>
            </div>
          )
      }
    }

export default Controller;