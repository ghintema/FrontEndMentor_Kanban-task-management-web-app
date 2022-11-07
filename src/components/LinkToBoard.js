import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { useRouteMatch } from 'react-router';
import icon  from '../assets/board-icon.svg';

// Presentational component to render the link

function LinkToBoard( { name } ) {

    // const [ path, url ] = useRouteMatch();
    

    return ( 
        <NavLink to="NewBoardForm"> {name}       
        </NavLink>
     );
}

export {LinkToBoard};