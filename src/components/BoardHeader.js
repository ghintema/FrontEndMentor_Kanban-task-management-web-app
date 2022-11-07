import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectBoards } from '../features/boards/boardsSlice'
// rendered den Titel des aktiven board.
// der aktive Board wird über die url ausgelesen.

function BoardHeader() {

    const allBoards = useSelector(selectBoards);
    // const currentBoardsId = useParams()
    // const currentBoardsName = allBoards[currentBoardsId].name;

    return (
      <div className='boardHeaderContainer'>
        <h1>Hier steht der Boardname</h1>
      </div>
        
      );
}

export {BoardHeader};