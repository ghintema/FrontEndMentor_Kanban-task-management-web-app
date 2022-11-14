import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectBoards, removeBoardFromBoards } from '../features/boards/boardsSlice';
import { selectColumns, removeColumnFromColumns } from '../features/columns/columnsSlice';
import { selectTasks, removeTaskFromTasks } from '../features/tasks/tasksSlice.js';
import cross from '../assets/cross-icon.svg';


function DeleteBoard() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { boardId } = useParams(); 
    const { taskId } = useParams();
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const allTasks = useSelector(selectTasks);

    const deleteBoard = () => {
        console.log('deleteBoard')

        allBoards[boardId].columnIds.forEach(columnId => {
            allColumns[columnId].taskIds.forEach(taskId => {
                dispatch(removeTaskFromTasks(taskId));
            })
            
            dispatch(removeColumnFromColumns(columnId))
        })

        dispatch(removeBoardFromBoards(boardId));

        history.push('')


    }


    const closeTheForm = (e) => {


        // close the form on click of 'formBackground' or 'iconCross'
        if (e.target.classList.contains('formBackground') ) {
            history.goBack() // to close the form
        }
        if (e.target.classList.contains('closeTheForm') ) {
            history.goBack() // to close the form
        }
    }

    return ( 
        <div className='formBackground' onClick={closeTheForm}>
            <div className='formContainer'>
                <h3 className='deleteHeadline'>Delete this Board?</h3>
                <p className='deleteText'>Are you sure you want to delete the <em>{allBoards[boardId].name}</em> board? This action will remove all columns and tasks and cannot be reversed.</p>
                <button
                    className='deleteButton'
                    onClick={deleteBoard}
                >
                    Delete
                </button>
                <button
                    className='cancelButton'
                    onClick={() => history.goBack()}
                >
                    Cancel
                </button>
            </div>
        </div>
     );
}

export { DeleteBoard };
