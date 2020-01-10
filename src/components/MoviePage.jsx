import React from 'react';
import Nav from './Nav'
import Search from './Search'
import RatingModal from './RatingModal'

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
      render: false,
      openWindow: false
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
      this.setState((prevState) => { return { film: json, render: true}})
    } else {
      alert("HTTP-Error: " + response.status);
    }
     })();
  }

  //render the film to page
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
         <Button variant="primary" size="lg" id="fav" onClick={ () => {this.userFav(this.props.match.params.id)}}>
          Favorite this movie
        </Button>
       <Button variant="primary" size="lg" onClick={this.openModal}>
         Rate this movie
      </Button>
         </div>

       </div>
    </div>)
  }

  //add user fav to local storage, if not already present.
  userFav(filmId){
     let favoritesArray =  JSON.parse(localStorage.getItem("favorites"))

    for (let i = 0; i < favoritesArray.length; i++) {
       if(favoritesArray[i] === filmId){
        return;
       } 
     }

     favoritesArray.push(filmId)
     localStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }
  

    openModal = _ => this.setState((prevState) => { return { openWindow: true}})
    

    closeModal = _ => this.setState((prevState) => { return { openWindow: false}})
    

    render() {
      return (
      <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <Search></Search>
           <div> 
             {this.state.render ?  this.renderRes(this.state.film) : " " } 
             {this.state.openWindow ?  <RatingModal openWindow={this.state.openWindow} filmId={this.props.match.params.id} closeModal={this.closeModal}/> : "" }
           </div>
        </div>
      </div>
      )
    }
  }

export default MoviePage;