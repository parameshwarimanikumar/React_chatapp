import React from 'react';
import Attach from "../assets/Attach.png";
import Img from "../assets/Img.png";

const Input = () => {
  return (
    <div className="input">
      <input type='text' placeholder='Type your messages here...' />
      <div className='send'>
        <img src={Attach} alt="Attach file" />
        <input type='file' style={{display: 'none'}} id='file' />
        <label htmlFor='file'>
          <img src={Img} alt='img' />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
}

export default Input;
