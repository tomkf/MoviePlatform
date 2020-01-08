import React from 'react';
import Nav from './Nav'
import Search from './Search'

//bootstrap components
import Button from 'react-bootstrap/Button'

//utilities
import util from '../utilities'
import genericMovie from '../images/genericMovie.png'


class ResultPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        film: null, 
        render: false
      }
    }  

    componentDidMount(){
      this.getData(this.props.match.params.id)
    }

    //parse query string for API
    parseToken(query){
      let queryString = ""
      let words = query.split(" ")

      if (words.length > 1){
        words.forEach(word => {
          queryString += `${word}+`
        });
        queryString = queryString.slice(0, -1); 
      } else {
        queryString = query
      }
      return queryString
    }

    //call API with movie title
    getData(movieTitle){
      let query = this.parseToken(movieTitle)
      let res = (async () => { let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${util.token}&query=${query}`);
  
      if (response.ok) { 
        let json = await response.json();
        if (json.total_results > 0) {
          this.setState((prevState) => { return { film: json.results[0], render: true}})
        } 
      } else {
        alert("HTTP-Error: " + response.status);
      }
       })();
    }

    //render film result from the API
    renderRes(film){
      return  (  
           <div>
           <div className="movieCard"> 
             <div className="moviePoster">
               <img  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${film.poster_path}`} alt={genericMovie}  variant="top"/>
             </div>
             <div className="movieContent"> 
             <div className="movieBanner"> 
              <h2> {film.original_title} </h2> 
              <h3> {util.parseDate(film.release_date)} </h3>
              <h3> User's Ratings: {film.vote_average * 10} % </h3>
             </div>
             <h3> Overview: </h3>
             <p> {film.overview} </p>
             </div>
           </div>
        </div>)
      }

    render() {
        return <div>
          <Nav></Nav>
          <div className="contentWrap">
              <Search></Search>
           <h1>SEARCH RESULT: </h1>
           <div>
             {this.state.render ?  this.renderRes(this.state.film) : "No matching search result, please try again." } 
           </div>
           </div>
          </div>
      }
}

export default ResultPage;