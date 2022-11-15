import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOptions } from '../features/options/optionsSlice';
import logoDark from '../assets/logo-dark.svg'
import logoBright from  '../assets/logo-bright.svg';
import  { allColorSchemes }  from '../colorScheme';

function Logo () {

    const options = useSelector(selectOptions);
    const [ colorScheme , setColorScheme ] = useState({})

    useEffect(() => {

      if (options.nightMode) {
          setColorScheme({'main':             allColorSchemes.main.nightMode,
                          'main2':            allColorSchemes.main2.nightMode,
                          'buttonPrimary':    allColorSchemes.buttonPrimary.nightMode,
                          'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                          'label':            allColorSchemes.label.nightMode});
      } else if (!options.nightMode) {
          setColorScheme({'main':             allColorSchemes.main.dayMode,
                          'main2':            allColorSchemes.main2.dayMode,
                          'buttonPrimary':    allColorSchemes.buttonPrimary.dayMode,
                          'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                          'label':            allColorSchemes.label.dayMode});
      }

    },[options.nightMode])

    return ( 
        <div className='logoContainer' style={colorScheme.main}>
            <img src={ !options.nightMode ? logoDark : logoBright} className="appLogo" alt="logo" />
        </div>
     );
}

export {Logo} ;