import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectBoards } from '../features/boards/boardsSlice'
// rendered den Titel des aktiven board.
// der aktive Board wird über die url ausgelesen.

function BoardHeader() {


    const { boardId } = useParams()  
    const allBoards = useSelector(selectBoards);
    // const currentBoardsId = useParams()
    // const currentBoardsName = allBoards[currentBoardsId].name;


    let title = 'Choose a Board or create a new one'

    if  (boardId && boardId.match(/[0-9]/)) {
      title = allBoards[boardId].name;
    } 

    return (
      <div className='boardHeaderContainer'>
        <h1>{title}</h1>
      </div>
        
      );
}

export {BoardHeader};