import React from 'react';
import eth from "../../Images/eth.png"
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
      <>
        <div className='getStarted'>
            <div className='starter-left'>
                <h1 id='start-title'>Advance your Portfolio, <br/> Currency of future <br/>Invest today.</h1>
                <Link to='/login'>
                    <button id='signup-btn' className='mx-5'>Log In</button>
                </Link>
                <Link to='/register'>
                  <button id='signup-btn'>Sign Up</button>
                </Link>
                    
            </div>
                <img src={eth} id='eth'/>
        </div>
      </>
  );
};

export default GetStarted;
