import React from 'react';
import Nav from './Nav'
import Search from './Search'
import { NavLink } from 'react-router-dom';

//bootstrap components
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';

//utilities
import util from '../utilities'
import genericMovie from '../images/genericMovie.png'


class ResultPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        films: null, 
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
          this.retrunState(json.results)
        } 
      } else {
        alert("HTTP-Error: " + response.status);
      }
       })();
    }

    //pass api results to state
    retrunState(json){
      console.log(json)
      let workingState = [];
    
        for(let i = 0; i < 8; i++){
          if (json[i]){
            workingState.push(json[i])
          }
        }
        this.setState((prevState) => { return { films: workingState, render: true}})
      }



      //render query results to page from state
      renderRes(items){
        let topResult = []
        let top = items[0]
        topResult.push(top)

        let renderTop =   this.filmCard(topResult)

        items.shift()
        let filmArr =  this.filmCard(items) 

        return (  <div> <div className="resultHeader"> <h2>Top Result: </h2> {renderTop}  <h2> Other Results: </h2> </div>  <div className="favBox"> { filmArr} </div> </div>)
      }


      filmCard(filmArray){
       return filmArray.map(film =>  ( 
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
      }
      

    render() {
        return <div>
          <Nav></Nav>
          <div className="contentWrap">
          <h1>SEARCH RESULT: </h1>
              <Search></Search>
           <div>
             {this.state.render ?  this.renderRes(this.state.films) : "No matching search result, please try again." } 
           </div>
           <span><NavLink to="/" exact>Back Home</NavLink></span>
           </div>
          </div>
      }
}

export default ResultPage;