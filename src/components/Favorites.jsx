import React from 'react';
import Nav from './Nav'

class Favorites extends React.Component {
    render() {
      return <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <h1>Favorites</h1>
        </div>
        </div>
    }
  }

export default Favorites;