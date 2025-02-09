import React from 'react';
import Nav from './Nav'
import genericMovie from '../images/genericMovie.png'
import { NavLink } from 'react-router-dom';
import Search from './Search'

//bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

//utilities required here
import util from '../utilities'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: null,
      render: false,
      searchTitle: "Most Popular:"
    }
  }  

  componentDidMount(){
    this.getData("https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc");
  }


  //fetch top 12 from api
  getData(apiUrl){
    let res = (async () => { let response = await fetch(`${apiUrl}&api_key=${util.token}&language=en-US&page=1`);

    if (response.ok) { 
      let json = await response.json();
      this.retrunState(json.results)
    } else {
      alert("HTTP-Error: " + response.status);
    }
     })();
  }

 
  //pass the api result to components state
  retrunState(json){
  let workingState = [];

    for(let i = 0; i < 12; i++){
      workingState.push(json[i])
    }
    this.setState((prevState) => { return { films: workingState, render: true}})
  }


  //return rendered list of movies
  renderRes(items){
    let filmArr =  items.map(film =>  ( 
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


  changeTitle = title =>  this.setState((prevState) => { return { searchTitle: title} })


  //make new request to API
   handleChange = val =>  {
    switch (val) {
      case 1:
      this.getData("https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc")
      this.changeTitle("Most popular:")
      break;
      case 2: 
      this.getData("https://api.themoviedb.org/3/movie/top_rated?") 
      this.changeTitle("Top Rated:")
      break;
      case 3:
      this.getData("https://api.themoviedb.org/3/movie/upcoming?&sort_by=primary_release_date.desc")
      this.changeTitle("Upcomming Films:")
      break;
      case 4:
      this.getData("https://api.themoviedb.org/3/movie/now_playing?&primary_release_date.desc")
      this.changeTitle("Now Playing:")
      break;
    }
   }

    render() {
      return (
      <div>
        <Nav></Nav>
      <div className="contentWrap"> 
       <h1>Home</h1>
        <Search></Search>
      <section className="topResultBox">
        <div>
        <h2> {this.state.searchTitle} </h2>
      <ButtonToolbar>
    <ToggleButtonGroup className="buttonToggle" type="radio" name="options" defaultValue={[1]} onChange={this.handleChange}>
      <ToggleButton value={1}> Most Popular </ToggleButton>
      <ToggleButton value={2}> Top Rated </ToggleButton>
      <ToggleButton value={3}> Upcomming </ToggleButton>
      <ToggleButton value={4}> Now Playing </ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>
          {this.state.render ? this.renderRes(this.state.films) : " " } 
          </div>
      </section>
       </div>
      </div>
      );
    }
  }

export default Home;