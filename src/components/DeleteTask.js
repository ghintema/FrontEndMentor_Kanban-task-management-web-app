import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectBoards, removeBoardFromBoards } from '../features/boards/boardsSlice';
import { selectColumns, addTaskIdToColumn, removeTaskIdFromColumn } from '../features/columns/columnsSlice';
import { selectTasks, removeTaskFromTasks } from '../features/tasks/tasksSlice.js';
import { selectOptions } from '../features/options/optionsSlice';
import cross from '../assets/cross-icon.svg';
import  { allColorSchemes }  from '../colorScheme';

function DeleteTask() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { boardId } = useParams(); 
    const { taskId } = useParams();
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const allTasks = useSelector(selectTasks);
    const options = useSelector(selectOptions);
    const [ colorScheme, setColorScheme ] = useState({});

    
    useEffect(() => {

        if (options.nightMode) {
            setColorScheme({'main':             allColorSchemes.main.nightMode,
                            'main2':            allColorSchemes.main2.nightMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.nightMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.nightMode});
        } else if (!options.nightMode) {
            setColorScheme({'main':             allColorSchemes.main.dayMode,
                            'main2':            allColorSchemes.main2.dayMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.dayMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.dayMode});
        }
  
      },[options.nightMode])
    
    
    
    
    const deleteTask = () => {
    
        // updating the column-slice by removing the taskId from the corresponding column.
        dispatch(removeTaskIdFromColumn([allTasks[taskId].columnId, taskId]))
        
        // updating the task-slice by removing the task.
        dispatch(removeTaskFromTasks(taskId))

        history.push(`/FrontEndMentor_Kanban-task-management-web-app/${boardId}`)

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
            <div className='formContainer' style={colorScheme.main}>
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
