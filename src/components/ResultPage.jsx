import React from 'react';
import Nav from './Nav'
import Search from './Search'
import util from '../utilities'



//grab url params 
//query api like so //https://api.themoviedb.org/3/search/movie?api_key=${util.token}&query=cats
//render individual movie

class ResultPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }  
    render() {
        return <div>
          <Nav></Nav>
          <div className="contentWrap">
              <Search></Search>
          <h1>SEARCH RESULT</h1>
          </div>
          </div>
      }
}

export default ResultPage;