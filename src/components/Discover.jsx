import React from 'react';
import Nav from './Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Checkbox } from 'antd';

const options = [
  { label: 'Action', value: 'action' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Animation', value: 'animation' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Crime', value: 'crime' },
  { label: 'Documentary', value: 'documentary' },
  { label: 'Drama', value: 'drama' },
  { label: 'Family', value: 'family' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'History', value: 'history' },
  { label: 'Horror', value: 'horror' },
  { label: 'Music', value: 'music' },
  { label: 'Romance', value: 'romance' },
  { label: 'Science Fiction', value: 'science+fiction' },
  { label: 'TV Movie', value: 'tv+movie' },
  { label: 'Thriller', value: 'triller' },
  { label: 'War', value: 'war' },
  { label: 'Western', value: 'western' }
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
    console.log(year, storage)
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