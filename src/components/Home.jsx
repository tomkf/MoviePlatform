import React from 'react';
import Nav from './Nav'

class Home extends React.Component {
    render() {
      return <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <h1>Home</h1>
        </div>
        </div>
    }
  }

export default Home;