import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBoards } from '../features/boards/boardsSlice'
import { selectOptions, setSubMenuVisibility } from '../features/options/optionsSlice';
import { SubMenu } from './SubMenu';
import iconDoener from '../assets/doener-icon.svg'

// rendered den Titel des aktiven board.
// der aktive Board wird über die url ausgelesen.

function BoardHeader() {


    const { boardId } = useParams()  
    const allBoards = useSelector(selectBoards);
    // const dispatch = useDispatch();
    // const options = useSelector(selectOptions);
    // const [showSubMenu, setShowSubMenu] = useState(false);
    // const currentBoardsId = useParams()
    // const currentBoardsName = allBoards[currentBoardsId].name;


    let title = 'No Board selected'

    const boardIdPlausible = Object.keys(allBoards).includes(boardId);

    if  (boardId && boardIdPlausible) {
      title = allBoards[boardId].name;
    } 

    // const subMenuClassListVisible   = 'subMenuContainer subMenuVisible';
    // const subMenuClassListInvisible = 'subMenuContainer subMenuInvisible';

    // const subMenuControl = () => {
    //   dispatch(setSubMenuVisibility(!options.subMenuVisiblity))
    // }

    return (
      <div className='boardHeaderContainer'>
        <h1>{title}</h1>
        <Link className='noneFormButton createNewButton' to={`${boardId}/NewTaskForm`}>+ Add new Task</Link>
        {/* <Link className='noneFormButton createNewButton' to={`${boardId}/EditBoardForm`}>Edit the Board</Link> */}

          {/* <button
            className='buttonOpenSubMenu' 
            aria-label='open submenu'
            onClick={subMenuControl}
            >

              <img 
                className='iconDoener'
                src={iconDoener} 
                alt=''/>
          </button>

          <div className={options.subMenuVisiblity ? subMenuClassListVisible : subMenuClassListInvisible }
                aria-hidden={!options.subMenuVisiblity}>
            <Link className='subMenuButton' 
                  to={`${boardId}/EditBoardForm`} 
                  onClick={() => dispatch(setSubMenuVisibility(false)) }>
                    Edit the Board
            </ Link>
            <Link className='subMenuButton' 
                  to={`${boardId}/Delete`}
                  onClick={() => dispatch(setSubMenuVisibility(false)) }
                  style={{color: 'red', fontWeight:'500'}} >
                    Delete the Board
            </ Link>
          </div> */}
          <SubMenu useCase='board' top='50px' right='30px' />

      </div>
        
      );
}

export {BoardHeader};