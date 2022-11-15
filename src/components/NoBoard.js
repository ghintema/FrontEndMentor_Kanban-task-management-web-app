import React, { useState } from 'react';
import { Link } from 'react-router-dom'

// Here is rendered what is showen when the selected Board doesn't not have any columns to be rendered.
// Message
function NoBoard() {

    const [ colorScheme, setColorScheme ] = useState({});

    return ( 
        <div className='emptyBoardContainer'>
            <p>No Board selected. Select a Board or create a new one.</p>
            <Link className='noneFormButton createNewButton' to='NewBoardForm'>+ Create new Board</Link>
        </div>
     );
}

export {NoBoard};