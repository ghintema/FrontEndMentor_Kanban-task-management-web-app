import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

// Here is rendered what is showen when the selected Board doesn't not have any columns to be rendered.
// Message
function EmptyBoard() {

    const { boardId } = useParams() 
    const linkToEditBoard = boardId && /[0-9]/.test(boardId) ? `${boardId}/EditBoardForm` : '/EditBoardForm'
    const [ colorScheme, setColorScheme ] = useState({});

    return ( 
        <div className='emptyBoardContainer'>
            <p>This board is empty. Create a new column to get started.</p>
            <Link   className='noneFormButton createNewButton' 
                    to={linkToEditBoard}
                    role='button'
                    aria-label='add new column'
                        >+ Add new Column</Link>
        </div>
     );
}

export {EmptyBoard};