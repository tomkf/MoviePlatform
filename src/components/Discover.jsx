import React from 'react';
import Nav from './Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Checkbox } from 'antd';
import util from '../utilities'


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
      gnereQuery: []
    }
  }

  onChange(checkedValues) {
    storage = checkedValues
    console.log(storage)
    // this.setState((prevState) => { return { gnereQuery: checkedValues}})
    // this.setState((prevState) => { return { gnereQuery: query} })
    // this.setState({
    //   gnereQuery: [...this.state.gnereQuery, query]
    // })
  }

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

    console.log(apiQuery)
  }

  

    render() {
      return <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <h1>Discover</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
    <Checkbox.Group options={options}  onChange={this.onChange} />
    <input type="text" label="Year of release" name="year"/>
    </form>
   </div>
        </div>
        </div>
    }
  }

export default Discover;