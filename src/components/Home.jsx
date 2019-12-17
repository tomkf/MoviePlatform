import React from 'react';
import Nav from './Nav'
import genericMovie from '../images/genericMovie.png'

//bootstrap components
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import token from '../utilities'

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
    console.log(apiUrl)
    let res = (async () => { let response = await fetch(`${apiUrl}&api_key=${token}&language=en-US&page=1`);

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

  routeFilm(filmObj){
    console.log(filmObj)
  }

  //return rendered list of movies
  renderRes(items){
    let filmArr =  items.map(film =>  ( 
  <Card bg="light" style={{ width: '20rem' }} className="filmCard" onClick={this.routeFilm(film)}>
  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${film.poster_path}`} alt={genericMovie}  variant="top"/>
  <Card.Body>
    <Card.Title> {film.title} </Card.Title> 
    <Card.Subtitle className="rating"> Users Rating: {film.vote_average * 10} % </Card.Subtitle>
    <Card.Subtitle className="rating"> {this.parseDate(film.release_date)} </Card.Subtitle>
    <Card.Text>
     {film.overview}
    </Card.Text>
  </Card.Body>
  <Button variant="primary"> Click to find out more. </Button>
</Card>
     ));
    return (  <div className="titlesContainer"> { filmArr} </div>)
  }

  parseDate(dateStr){
  let year = dateStr.slice(0, 4)
  let month = dateStr.slice(5, 7)
  let day = dateStr.slice(8, 10)
  let parseMonth = ""

  switch(month){
    case "01":
      parseMonth = "January";
    break;
    case "02":
        parseMonth = "Febuary";
    break;
    case "03":
        parseMonth = "March";
    break;
    case "04":
        parseMonth = "April";
    break;
    case "05":
        parseMonth = "May";
    break;
    case "06":
        parseMonth = "June";
    break;
    case "07":
        parseMonth = "July";
    break;
    case "08":
        parseMonth = "August";
    break;
    case "09":
        parseMonth = "September";
    break;
    case "10":
        parseMonth = "October";
    break;
    case "11":
        parseMonth = "November";
    break;
    case "12":
        parseMonth = "December";
    break;
  }

  return `${parseMonth} ${day}, ${year}`
  }

  changeTitle = title =>  this.setState((prevState) => { return { searchTitle: title} })

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
      this.getData("https://api.themoviedb.org/3/movie/upcoming?&sort_by=release_date.asc")
      this.changeTitle("Upcomming Films:")
      break;
      case 4:
      this.getData("https://api.themoviedb.org/3/movie/now_playing?&sort_by=release_date.asc")
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
      <section className="searchBar"> 
        <InputGroup className="mb-3">
         <InputGroup.Prepend>
          <InputGroup.Text>Search movie by title</InputGroup.Text>
         </InputGroup.Prepend>
           <FormControl />
        </InputGroup>
      </section>
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