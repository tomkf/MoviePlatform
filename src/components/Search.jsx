import React from 'react';
import InputGroup  from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


class Search  extends React.Component {

  handleSubmit(e){
    e.preventDefault()
    window.location.replace(`/search/${e.target.userInput.value}`)
  }

  render() {
    return (
     <section className="searchBar"> 
      <form  onSubmit={this.handleSubmit}>
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
      <InputGroup.Text> Search movie by title: </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl type="text" name="userInput"/>
    </InputGroup>
    </form>
  </section>
      );
    }
}

export default Search;