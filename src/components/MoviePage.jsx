import React from 'react';
import Nav from './Nav'
import Search from './Search'

//bootstrap components
import Button from 'react-bootstrap/Button'

//utilities
import util from '../utilities'
import genericMovie from '../images/genericMovie.png'


class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: null,
      render: false
    }
  }  

  componentDidMount(){
    this.getData(this.props.match.params.id);
  }

  //fetch movie ID from API
  getData(movieId){
    let res = (async () => { let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${util.token}&language=en-US`);

    if (response.ok) { 
      let json = await response.json();
      // this.retrunState(json.results)
      this.setState((prevState) => { return { film: json, render: true}})
    } else {
      alert("HTTP-Error: " + response.status);
    }
     })();
  }

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
         <Button variant="primary" size="lg">
          Favorite this movie
        </Button>
       <Button variant="primary" size="lg">
         Rate this movie
      </Button>
         </div>

       </div>
    </div>)
  }

    render() {
      return (
      <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <Search></Search>
           <div> 
             {this.state.render ?  this.renderRes(this.state.film) : " " } 
           </div>
        </div>
      </div>
      )
    }
  }

export default MoviePage;