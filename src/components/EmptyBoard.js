import React from 'react';

// Here is rendered what is showen when the selected Board doesn't not have any columns to be rendered.
// Message
function EmptyBoard() {
    return ( 
        <div className='emptyBoardContainer'>
            <p>This board is empty. Create a new column to get started.</p>
            <button className='noneFormButton createNewButton'>+ Add new Column</button>
        </div>
     );
}

export {EmptyBoard};