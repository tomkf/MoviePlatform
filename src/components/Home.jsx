import React from 'react';
import Nav from './Nav'
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Card from 'react-bootstrap/Card'
import token from '../utilities'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: null,
      render: false
    }
  }  

  componentDidMount(){
    this.getData();
  }

  //fetch top 12 from api
  getData(){
    let res = (async () => { let response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=${token}`);

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
  <Card style={{ width: '18rem' }} className="filmCard">
  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${film.poster_path}`}  variant="top"/>
  <Card.Body>
    <Card.Title> {film.title} </Card.Title>
    <Card.Text>
     {film.overview}
    </Card.Text>
  </Card.Body>
</Card>
     ));
    return (  <div className="titlesContainer"> { filmArr} </div>)
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
        <h2>Most popular: </h2>
          {this.state.render ? this.renderRes(this.state.films) : " " } 
          </div>
      </section>
       </div>
      </div>
      );
    }
  }

export default Home;