import React from 'react';
import Nav from './Nav'
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'

class Home extends React.Component {
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
       </div>
      </div>
      );
    }
  }

export default Home;