import React from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectBoards } from './boardsSlice';
import { selectColumns } from '../columns/columnsSlice';
import { Column } from '../columns/Column';
import { EmptyBoard } from '../../components/EmptyBoard'

// Look for the path for the id of the board wich is supposed to be shown.
// If the board doesn't have any columns, then show message component <EmptyBoard /> 'the board is empty...' and button '+ Add new column' 


function Board() {

    const allBoards = useSelector(selectBoards);
    const { boardId } = useParams()
    
    console.log(boardId)
    console.log(allBoards[boardId])
    console.log(typeof boardId === 'number')

   

    let columnsToBeRendered = []

    if  (boardId && boardId.match(/[0-9]/)) {
      
         columnsToBeRendered = allBoards[boardId].columnIds // Array with Ids of all columns to be rendered    
    }

    console.log(columnsToBeRendered)

    const boardIsEmpty = columnsToBeRendered.length === 0;
    
    console.log(columnsToBeRendered)
    console.log(boardIsEmpty)

    return ( 
        <div className='boardContainer'>
            {boardIsEmpty ? <EmptyBoard /> :
               columnsToBeRendered.map((id) => <Column id={id} key={id} />)
            }
                
                
            
        </div>
     );
} 

export { Board } ;