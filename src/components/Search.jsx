import React from 'react';
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import util from '../utilities'

// <Route path="/search/:id"  component={ResultPage} /> 
//send search params in event url as query string to result page component

const Search = () => (
    <section className="searchBar"> 
    <InputGroup className="mb-3">
     <InputGroup.Prepend>
      <InputGroup.Text> Search movie by title </InputGroup.Text>
     </InputGroup.Prepend>
       <FormControl />
    </InputGroup>
  </section>
);

export default Search;