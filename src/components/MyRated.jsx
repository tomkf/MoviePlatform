import React from 'react';
import Nav from './Nav'
import { NavLink } from 'react-router-dom';
import genericMovie from '../images/genericMovie.png'
import Search from './Search'

//bootstrap 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

//utilities
import util from '../utilities'


class MyRated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      rateId: null
    }
  }  


  //grab local storage data and pass to state, if user has ratings
  componentDidMount(){
    let storageArray =  JSON.parse(localStorage.getItem("ratings"))
    if (storageArray.length > 0){
      this.setState((prevState) => { return { rateId: storageArray} })
    }
    this.passApiData(storageArray)
  }


  //make API call for each movie ID
  passApiData(filmIDArray){
    filmIDArray.forEach(element => this.callApi(element.filmId));
  }


  //pass  each API call to state
  callApi(movieId){
    let res = (async () => { let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${util.token}&language=en-US`);

    if (response.ok) { 
      let filmJson = await response.json();
      let filmArray = this.state.ratings.concat(filmJson);
      this.setState({ ratings: filmArray })
    } else {
      alert("HTTP-Error: " + response.status);
    }
     })();
  }

  
  renderItems(ratingsArray){
    let filmArr =  ratingsArray.map(film =>  ( 
      <Card bg="light" style={{ width: '20rem' }} className="filmCard" >
      <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${film.poster_path}`} alt={genericMovie}  variant="top"/>
      <Card.Body>
        <Card.Title> {film.title} </Card.Title> 
        <Card.Subtitle className="rating"> Users Rating: {film.vote_average * 10} % </Card.Subtitle>
        <Card.Subtitle className="rating"> {util.parseDate(film.release_date)} </Card.Subtitle>
        <Card.Text>
         {film.overview}
        </Card.Text>
      </Card.Body>
       <NavLink to={`/movie/${film.id}`} > <Button variant="primary"> Click to find out more. </Button>   </NavLink> 
    </Card>
         ));
        return (  <div className="titlesContainer"> { filmArr} </div>)
  }

    render() {
      return( <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <Search></Search>
        <h1>Favorites</h1>
        {this.state.rateId != null ? this.renderItems(this.state.ratings) : <h1> Sorry you have not rated any films </h1> }
        </div>
        </div>
      )
    }
  }

export default MyRated;