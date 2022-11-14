import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectBoards, removeBoardFromBoards } from '../features/boards/boardsSlice';
import { selectColumns, addTaskIdToColumn, removeTaskIdFromColumn } from '../features/columns/columnsSlice';
import { selectTasks, addTaskToTasks } from '../features/tasks/tasksSlice.js';
import cross from '../assets/cross-icon.svg';


function DeleteTask() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { boardId } = useParams(); 
    const { taskId } = useParams();
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const allTasks = useSelector(selectTasks);

    const deleteTask = () => {
        console.log('deleteBoard')
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
                <p className='deleteText'>Are you sure you want to delete the <em>{allTasks[taskId].name}</em> task? This action cannot be reversed.</p>
                <button
                    className='deleteButton'
                    onClick={deleteTask}
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

export { DeleteTask };
