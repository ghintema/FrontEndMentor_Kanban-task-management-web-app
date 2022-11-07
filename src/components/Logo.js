import React from 'react';
import logo from '../assets/logo.svg'

function Logo () {
    return ( 
        <div className='logoContainer'>
            <img src={logo} className="appLogo" alt="logo" />
        </div>
     );
}

export {Logo} ;