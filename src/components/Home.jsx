import React from 'react';
import Nav from './Nav'
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
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

  getData(){
    let res = (async () => { let response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=${token}`);

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      console.log(json)
      this.retrunState(json.results)
    } else {
      alert("HTTP-Error: " + response.status);
    }
     })();
  }
 
  retrunState(json){
  let workingState = [];

    for(let i = 0; i < 12; i++){
      workingState.push(json[i])
    }
    this.setState((prevState) => { return { films: workingState, render: true}})
    console.log("hi", this.state.films)
  }

  renderRes(items){
    console.log("hi from the render", this.state.films)
    let filmArr =  items.map(film =>  <h1> {film.title} </h1> );
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