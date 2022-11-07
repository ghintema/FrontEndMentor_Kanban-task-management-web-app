import React from 'react'
import { useSelector } from 'react-redux'
import { selectBoards } from '../features/boards/boardsSlice'
import { LinkToBoard } from './LinkToBoard'
// List of Links for every entry in 'boards'

// Below that a button/Link to a path that shows 'EditBoard' component above all others. 

// To hide the nav and give the space to board: set max-width to zero wenn navVisibility is false

function Navigation() {

    const allBoards = useSelector(selectBoards);
    const numOfBoards = Object.keys(allBoards).length;


    return ( 
        <div className='navigationContainer'>
            <h2>{`All Boards(${numOfBoards}) `}</h2>

            {Object.values(allBoards).map((board) => {
                return <LinkToBoard name={board.name} key={board.id} />
            })}
        </div>
     );
}

export {Navigation};