import React from 'react';
import './Err404.css'
import img from "../../assets/Animation.gif"
const NotFound = () => {
  return (

    <div className="err_container">
      <div className="err_404">
        <div className="err_4">4</div>
        <div className="err_4">0</div>
        <div className="err_4">4</div>
      </div>
      <div className="err_oops">OOPS!! NOTHING WAS FOUND</div>
      <div className="err_para">
        <div className="err_para1">The page you were looking for might have been removed or its temporarily unavailable.</div>
        <div className="err_para2" style={{ cursor: 'pointer' }}> Return to homepage</div>
      </div>
      <div className="err_gif">
        <img src={img}></img>
      </div>
    </div>


  );
};




export default NotFound;
