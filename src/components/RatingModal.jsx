import React from 'react';
import ReactModal from 'react-modal';

import StarRatingComponent from 'react-star-rating-component';
// docs: https://www.npmjs.com/package/react-star-rating-component


class RatingModal extends React.Component {
  constructor() {
    super();
 
    this.state = {
      rating: 0
    };
  }

    
  //open rating modal and add rating to local storage, if not already present.
  userRate(filmId, rating){
    let newUserRating = {filmId: filmId, rating: rating}

    let ratingsArray =  JSON.parse(localStorage.getItem("ratings"))

    for (let i = 0; i < ratingsArray.length; i++) {
      if(ratingsArray[i].filmId === filmId){
        ratingsArray[i].rating = rating
        return localStorage.setItem('ratings', JSON.stringify(ratingsArray))
      } 
    }

    ratingsArray.push(newUserRating)

    localStorage.setItem('ratings', JSON.stringify(ratingsArray))
    this.props.closeModal()
  }


  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
    this.userRate(this.props.filmId, nextValue)
  }
 

    render(){
        return( 
             <div> <ReactModal isOpen={this.props.openWindow}  style={{ overlay: {backgroundColor: "rgb(102, 120, 156)", margin: "6%", marginTop: "12%", borderRadius: "10px", zIndex: "10"}, content: { width: "82vw"} } } > 
            <h2>Rate this movie: </h2>

            <StarRatingComponent 
             name="rate1" 
             starCount={5}
             value={this.state.rating}
             onStarClick={this.onStarClick.bind(this)}
             />


            <button onClick={this.props.closeModal}> Cancel </button>

             </ReactModal> 
             </div> 
             )
         }
}

export default RatingModal;