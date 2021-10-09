import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

export default function StartCompnent() {
  return (
    <Fragment>
      <div className='start-wrapper'>
        <div className='header-wrapper'>
          <img src={logo} alt='Visual Dollar Logo' className='header-logo' />
          <h1 className='logo-header'>Visual Dollar</h1>
        </div>

        <div className='start-btn-wrapper'>
          <p>Let's begin by entering a few details</p>
          <Link to='/enter-your-income-and-expenses' className='start-btn'>
            START
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
