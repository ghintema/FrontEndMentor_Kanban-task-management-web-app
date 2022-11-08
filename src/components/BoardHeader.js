import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectBoards } from '../features/boards/boardsSlice'
import { Link } from 'react-router-dom';

// rendered den Titel des aktiven board.
// der aktive Board wird über die url ausgelesen.

function BoardHeader() {


    const { boardId } = useParams()  
    const allBoards = useSelector(selectBoards);
    // const currentBoardsId = useParams()
    // const currentBoardsName = allBoards[currentBoardsId].name;


    let title = 'Choose a Board or create a new one'

    const boardIdPlausible = Object.keys(allBoards).includes(boardId);

    if  (boardId && boardIdPlausible) {
      title = allBoards[boardId].name;
    } 

    return (
      <div className='boardHeaderContainer'>
        <h1>{title}</h1>
        <Link className='noneFormButton createNewButton' to={`${boardId}/NewTaskForm`}>+ Add new Task</Link>
        <Link className='noneFormButton createNewButton' to={`${boardId}/EditBoardForm`}>Edit the Board</Link>
      </div>
        
      );
}

export {BoardHeader};