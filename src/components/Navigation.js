import React, { useState } from 'react';
import { useSelector, dispatch, useDispatch } from 'react-redux';
import { selectBoards } from '../features/boards/boardsSlice';
import { selectOptions } from '../features/options/optionsSlice';
import { toggleNavVisibility, toggleLightMode} from '../features/options/optionsSlice';
import { Link, NavLink, useParams } from 'react-router-dom';
import { LinkToBoard } from './LinkToBoard';
import iconBoard from '../assets/board-icon.svg';
import iconClosedEye from '../assets/closed-eye-icon.svg';
import iconOpenEye from '../assets/open-eye-icon.svg';
import iconSun from '../assets/sun-icon.svg';
import iconMoon from '../assets/moon-icon.svg';
import './sliderSwitch.css'

// List of Links for every entry in 'boards'

// Below that a button/Link to a path that shows 'EditBoard' component above all others. 

// To hide the nav and give the space to board: set max-width to zero wenn navVisibility is false

function Navigation() {

    const options = useSelector(selectOptions);
    const allBoards = useSelector(selectBoards);
    const numOfBoards = Object.keys(allBoards).length;
    const { boardId } = useParams() 
    const dispatch = useDispatch();
    const linkToCreateNewBoard = /[0-9]/.test(boardId) ? `${boardId}/NewBoardForm` : '/NewBoardForm'


    const hideNavigation = () => {
        console.log('hideNavigation invoked')
        dispatch(toggleNavVisibility())
    }

    let hover = false;

    return ( 
        <aside  className={options.navVisibility ?  'navigationContainer' : 'hideTheNav'}
                aria-hidden={!options.navVisibility}>
            <h4 className='navigationHeadline'>{`All Boards(${numOfBoards}) `}</h4>
            <ul>
            {Object.values(allBoards).map((board) => {
                return  <li className='navItem' key={board.id}> 
                            <NavLink className='linkToExistingBoard'
                                    activeClassName='activelinkToExistingBoard' 
                                    onMouseEnter={(e) => e.target.classList.add('navLinkHovered')}
                                    onMouseLeave={(e) => e.target.classList.remove('navLinkHovered')}
                                    to={board.id} key={board.id + 3}>
                                <img src={iconBoard} className='iconBoard' key={board.id + 2} alt=''/>

                                {board.name}
                            </NavLink> 
                        </li>
            })}
            <li className='navItem'>
                <NavLink className='linkToCreateNewBoard'
                        to= {linkToCreateNewBoard}
                        onMouseEnter={(e) => e.target.classList.add('navLinkHovered')}
                        onMouseLeave={(e) => e.target.classList.remove('navLinkHovered')}>
                    <img src={iconBoard} className='iconBoard' key={33} alt=''/>
                    + Create New Board
                </NavLink>
            </li>
            </ul>
            
            <div className='nightModeSliderContainer'>
                <img src={iconSun} alt='' />
                <label className="switch">
                    <input type="checkbox"  />
                    <span className="slider round"></span>
                </label>
                <img src={iconMoon} alt='' />
            </div>

        
            <button 
                className={options.navVisibility ? 'buttonHideTheNavExtended' : 'buttonHideTheNavAbrigded'} 
                onClick={hideNavigation}
                onMouseEnter={(e) => {
                    if (options.navVisibility) {
                        e.target.classList.add('navLinkHovered')
                    }}}
                onMouseLeave={(e) => e.target.classList.remove('navLinkHovered')}
                key={34}>
                    {options.navVisibility && <div><img src={iconClosedEye} className='iconClosedEye' key={35} alt=''/> 
                                                <span>Hide the Sidebar</span></div>}
                    {!options.navVisibility && <img src={iconOpenEye} className='iconClosedEye' key={35} alt=''/>}
            </button> 
        </aside>
     );
}

export {Navigation};