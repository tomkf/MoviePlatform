import React from 'react';
import Nav from './Nav'
import dblogo from '../images/dblogo.svg'


//5010e01fe46a79047256333f2727c644 

class About extends React.Component {
    render() {
      return <div>
        <Nav></Nav>
        <div className="contentWrap"> 
        <h1>About: </h1>
        <img src={dblogo} />
        <section>
         <p> This product uses the TMDb API but is not endorsed or certified by TMDb. </p>
         <p> More info: <a href="https://www.themoviedb.org/faq/api"> The Movie DB APi</a> </p>
        </section>
        </div>
       </div>
    }
  }

export default About;