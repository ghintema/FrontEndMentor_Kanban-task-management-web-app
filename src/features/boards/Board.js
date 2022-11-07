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
    // const currentBoardsId = useParams()
    // const columnsToBeRendered = allBoards[currentBoardsId].columnIds; // Array with Ids of all columns to be rendered 
    // const boardIsEmpty = columnsToBeRendered.length == 0;
    
    return ( 
        <div className='boardContainer'>
            {/* {boardIsEmpty ? <EmptyBoard /> :
                columnsToBeRendered.map((column) => <Column id={column.id} key={column.id} />)
            } */}
                
                
            
        </div>
     );
} 

export { Board } ;