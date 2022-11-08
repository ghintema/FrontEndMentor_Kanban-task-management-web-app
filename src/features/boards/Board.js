import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBoards } from './boardsSlice';
import { selectColumns } from '../columns/columnsSlice';
import { Column } from '../columns/Column';
import { EmptyBoard } from '../../components/EmptyBoard'
import { NoBoard } from '../../components/NoBoard'

// Look for the path for the id of the board wich is supposed to be shown.
// If the board doesn't have any columns, then show message component <EmptyBoard /> 'the board is empty...' and button '+ Add new column' 


function Board() {

    const allBoards = useSelector(selectBoards);
    const { boardId } = useParams()
    
    // console.log(boardId)
    // console.log(allBoards[boardId])
    // console.log(typeof boardId === 'number')

   

    let columnsToBeRendered = []

    // const boardSelected = /[0-9]/.test(boardId) // test for a numbered id.

    const boardIdPlausible = Object.keys(allBoards).includes(boardId);

    if  (boardId && boardIdPlausible) {
         columnsToBeRendered = allBoards[boardId].columnIds // Array with Ids of all columns belonging to the selected board    
    }

    const linkToEditBoard = boardId && boardIdPlausible ? `${boardId}/EditBoardForm` : '/EditBoardForm'
    const boardIsEmpty = columnsToBeRendered.length === 0;

    return ( 
        <div className='boardContainer'>
            { !boardIdPlausible ? <NoBoard /> : 
             boardIsEmpty ? <EmptyBoard /> : (
             columnsToBeRendered.map((id) => <Column id={id} key={id} />)
             )}
           
           
           
            {/* {if (!boardSelected) {
                <NoBoard /> 
            } else if (boardIsEmpty) {
                <EmptyBoard />
              } else {
                columnsToBeRendered.map((id) => <Column id={id} key={id} />)
                // <Link className='linkToEditBoard'> </Link>
              } 
            }   */}
            
                
                
            
        </div>
     );
} 

export { Board } ;