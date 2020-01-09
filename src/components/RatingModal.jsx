import React from 'react';
import ReactModal from 'react-modal';

class RatingModal extends React.Component {

    
  //open rating modal and add rating to local storage, if not already present.
  userRate(filmId){
    let ratingsArray =  JSON.parse(localStorage.getItem("ratings"))

  }

    render(){
        return( 
             <div> <ReactModal isOpen={this.props.openWindow}  style={{ overlay: {backgroundColor: "rgb(102, 120, 156)", margin: "6%", borderRadius: "10px"}, content: { width: "82vw"} } } > 
            <h2>Rate this movie: </h2>
            
            <button onClick={this.props.closeModal}> Cancel </button>

             </ReactModal> 
             </div> 
             )
         }
}

export default RatingModal;