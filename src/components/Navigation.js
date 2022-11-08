import React from 'react'
import { useSelector } from 'react-redux'
import { selectBoards } from '../features/boards/boardsSlice'
import { Link, NavLink } from 'react-router-dom'
import { LinkToBoard } from './LinkToBoard'
import iconBoard from '../assets/board-icon.svg'
// List of Links for every entry in 'boards'

// Below that a button/Link to a path that shows 'EditBoard' component above all others. 

// To hide the nav and give the space to board: set max-width to zero wenn navVisibility is false

function Navigation() {

    const allBoards = useSelector(selectBoards);
    const numOfBoards = Object.keys(allBoards).length;


    return ( 
        <div className='navigationContainer'>
            <h2>{`All Boards(${numOfBoards}) `}</h2>
            <ul>
            {Object.values(allBoards).map((board) => {
                return  <li className='navItem' key={board.id}> 
                            <img src={iconBoard} className='iconBoard' key={board.id + 2} alt=''/>
                            <NavLink className='linkToExistingBoard' to={board.id} key={board.id + 3}>{board.name}</NavLink> 
                        </li>
            })}
            <li className='navItem'>
                <NavLink className='linkToCreateNewBoard' to='NewBoardForm'>+ Create new board</NavLink>
            </li>
            </ul>
            
        </div>
     );
}

export {Navigation};