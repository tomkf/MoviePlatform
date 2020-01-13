import React from 'react';
import Nav from './Nav'
import genericMovie from '../images/genericMovie.png'
import { NavLink } from 'react-router-dom';
import util from '../utilities'

//bootstrap components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import { Checkbox } from 'antd';

const options = [
  { label: 'Action', value: '28' },
  { label: 'Adventure', value: '12' },
  { label: 'Animation', value: '16' },
  { label: 'Comedy', value: '35' },
  { label: 'Crime', value: '80' },
  { label: 'Documentary', value: '99' },
  { label: 'Drama', value: '18' },
  { label: 'Family', value: '10751' },
  { label: 'Fantasy', value: '14' },
  { label: 'History', value: '36' },
  { label: 'Horror', value: '27' },
  { label: 'Music', value: '10402' },
  { label: 'Mystery', value: '9648' },
  { label: 'Romance', value: '10749' },
  { label: 'Science Fiction', value: '878' },
  { label: 'TV Movie', value: '10770' },
  { label: 'Thriller', value: '53' },
  { label: 'War', value: '10752' },
  { label: 'Western', value: '37' }
];

let storage = []


class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
      films: null,
      searchTitle: "Most Popular:",
      customSort: "Highest/Lowest Rating",
      customToggle: {"a": false, "b": false, "c": false}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  //grab checkbox values 
  onSelect(checkedValues) {
    storage = checkedValues
  }


  //grab user inputs, build query string
  handleSubmit(e){
    e.preventDefault()
    let year = e.target.year.value
    let genreQuery = ""
    let apiQuery = ""

    if (storage.length > 1){
      storage.forEach(genre => {
        genreQuery += genre += ","
      })
      apiQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${util.token}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genreQuery.slice(0, -1)}&primary_release_year=${year}`
    } else if (storage.length === 1) {
      apiQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${util.token}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${storage[0]}&primary_release_year=${year}`
    } else {
    apiQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${util.token}&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=${year}`
    }

     this.callApi(apiQuery)
  }


  callApi(query){
     let res = (async () => { let response = await fetch(query);

     if (response.ok) { 
       let json = await response.json();
       this.retrunState(json.results)
     } else {
       alert("HTTP-Error: " + response.status);
     }
      })();
  }


  //pass top 12 API results to state
  retrunState(json){
    let workingState = [];
  
      for(let i = 0; i < 12; i++){
        workingState.push(json[i])
      }
      this.setState((prevState) => { return { films: workingState, render: true}})
    }
  

  //render results to view
  renderFilms(items){
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
  return (  <div>  <h3> {this.state.searchTitle} </h3> <div className="titlesContainer">  { filmArr} </div>  <Button onClick={ () => this.customSort(this.state.customSort)}> {this.state.customSort} </Button> </div>)
  }


customSort = val => {
  switch (val) {
    case "Highest/Lowest Rating":
      if (this.state.customToggle.a === false){
        this.state.films.sort((a,b) => (b.vote_average < a.vote_average) ? 1 : ((a.vote_average < b.vote_average) ? -1 : 0))
        this.toggleState("a", true)
      } else {
        this.state.films.sort((a,b) => (a.vote_average < b.vote_average) ? 1 : ((b.vote_average < a.vote_average) ? -1 : 0))
        this.toggleState("a", false)
      }
    
    break 
    case "Oldest/Newest":
      if (this.state.customToggle.b === false){
        this.state.films.sort((a,b) => (b.release_date > a.release_date) ? 1 : ((a.release_date > b.release_date) ? -1 : 0))
        this.toggleState("b", true)
      } else {
        this.state.films.sort((a,b) => (a.release_date > b.release_date) ? 1 : ((b.release_date > a.release_date) ? -1 : 0))
        this.toggleState("b", false)
      }
    break 
    case "A-Z / Z-A":
      if (this.state.customToggle.c === false){
        this.state.films.sort((a,b) => (b.title > a.title) ? 1 : ((a.title > b.title) ? -1 : 0))
        this.toggleState("c", true)
      } else {
        this.state.films.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        this.toggleState("c", false)
      }
    break 
  }
}


  //toggle for custom switch
  toggleState = (key, val) => {
    this.setState({
      customToggle : {...this.state.customToggle, [key]: val }
  })
  }


  sortResult = val =>  {
    switch (val) {
      case 1:
        this.state.films.sort((a,b) => (a.vote_average < b.vote_average) ? 1 : ((b.vote_average < a.vote_average) ? -1 : 0))
        this.changeTitle("Most popular:", "Highest/Lowest Rating")
      break;
      case 2: 
      this.state.films.sort((a,b) => (a.release_date > b.release_date) ? 1 : ((b.release_date > a.release_date) ? -1 : 0))
      this.changeTitle("Release Date:", "Oldest/Newest")
      break;
      case 3:
        this.state.films.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      this.changeTitle("Results:", "A-Z / Z-A")
      break;
    }
   }


   changeTitle = (title, subtitle) =>  this.setState((prevState) => { return { searchTitle: title, customSort: subtitle} })


    render() {
      return <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <h1>Discover</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
    <Checkbox.Group options={options}  onChange={this.onSelect} />
    <input type="text" label="Year of release" name="year"/>
    </form>
   </div>
       <div className="topResultBox"> 
         {this.state.render ?  <div> <h3> Sort By: </h3> <ButtonToolbar>
    <ToggleButtonGroup className="buttonToggle" type="radio" name="options" defaultValue={[1]} onChange={this.sortResult}>
      <ToggleButton value={1}> Rating </ToggleButton>
      <ToggleButton value={2}> Release Date </ToggleButton>
      <ToggleButton value={3}> Title </ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar> 
  {this.state.render ? this.renderFilms(this.state.films) : " "}
  </div> : ""}
       </div>
        </div>
        </div>
    }
  }

export default Discover;