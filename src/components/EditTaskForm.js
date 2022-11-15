import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectBoards } from '../features/boards/boardsSlice';
import { selectColumns, addTaskIdToColumn, removeTaskIdFromColumn } from '../features/columns/columnsSlice';
import { selectTasks, addTaskToTasks } from '../features/tasks/tasksSlice.js';
import { selectOptions } from '../features/options/optionsSlice';
import  { allColorSchemes }  from '../colorScheme';
import cross from '../assets/cross-icon.svg';

// The only adaptions from NewTaksForm -> EditTaskForm is
// 1.) presentTask -> presentTask. Search and Replace all over the file
// 2.) initialize presentTask with all values according to taskId
// 3.) function 'saveTheTask' -> was renamed to 'saveTheTask' for more semantic name
// 4.) button 'Create Task' was renamed to 'Save Changes' for more semantics
// 5.) the <option> - element has gotten a selected-attribute depending on current column.

function EditTaskForm() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const { boardId } = useParams(); 
    const { taskId } = useParams();
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const allTasks = useSelector(selectTasks);
    const options = useSelector(selectOptions);
    const [ colorScheme, setColorScheme ] = useState({});

    // initializing the local states with the existing values 
    // of the selected task to pre-fill the form and to preserv unchanged data
    const [presentTask, setPresentTask] = useState({name: allTasks[taskId].name, 
                                            id: allTasks[taskId].id,
                                            description: allTasks[taskId].description, 
                                            columnId: allTasks[taskId].columnId, 
                                            boardId: boardId,
                                            boardColumnIds: allTasks[taskId].boardColumnIds,
                                            subTasks: allTasks[taskId].subTasks})

    useEffect(() => {

        if (options.nightMode) {
            setColorScheme({'main':             allColorSchemes.main.nightMode,
                            'main2':            allColorSchemes.main2.nightMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.nightMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.nightMode});
        } else if (!options.nightMode) {
            setColorScheme({'main':             allColorSchemes.main.dayMode,
                            'buttonPrimary':    allColorSchemes.buttonPrimary.dayMode,
                            'buttonSecondary':  allColorSchemes.buttonSecondary.nightMode,
                            'label':            allColorSchemes.label.dayMode});
        }

    },[options.nightMode])



    const changeTaskName = (e) => {
        const presentTaskCopy = {...presentTask};           // copy to prevent state-mutation
        presentTaskCopy.name = e.target.value;          // change the copy as needed.
        setPresentTask(presentTaskCopy);                    // update the state with the copy
    }

    const changeTaskDescription = (e) => {
        const presentTaskCopy = {...presentTask};           // copy to prevent state-mutation
        presentTaskCopy.description = e.target.value;   // change the copy as needed.
        setPresentTask(presentTaskCopy);                    // update the state with the copy
    }
    
    const changeSubTaskName = (e) => {
        const index = +e.target.id                              // the + in front of e.target.id converts string to number
        const presentTaskCopy = JSON.parse(JSON.stringify(presentTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        presentTaskCopy.subTasks[index].name = e.target.value;      // change the indexed element to new value
        setPresentTask(presentTaskCopy);                                // update the state with the copy
    }

    const removeSubTask = (e) => {
        const index = +e.target.id
        const presentTaskCopy = JSON.parse(JSON.stringify(presentTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        presentTaskCopy.subTasks.splice(index,1)                    // remove the indexed element from the array 
        setPresentTask(presentTaskCopy);                                // update the state with the copy
    }

    const addSubTask =  (e) => {
        const index = +e.target.id
        const presentTaskCopy = JSON.parse(JSON.stringify(presentTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        presentTaskCopy.subTasks.push({name: '',                    // add a new subTask-object to the array.
                                    id: Math.floor(Math.random()*1000).toString(),
                                    status: 'open'})                    
        setPresentTask(presentTaskCopy);                                // update the state with the copy
    }


    const choseTargetColumn = (e) => {
        const presentTaskCopy = {...presentTask};           // copy to prevent state-mutation
        presentTaskCopy.columnId = e.target.value;      // change the copy as needed.
        setPresentTask(presentTaskCopy);                    // update the state with the copy
    }

    const storeChanges = () => {
        
        // updating the tasks-slice with the presentTask.
        dispatch(addTaskToTasks({...presentTask}))

        // updating the column-slice, removing the task.id from former column and adding the task.id to next column 
        dispatch(removeTaskIdFromColumn([allTasks[taskId].columnId, presentTask.id])) // update the former column, that the task was removed
        dispatch(addTaskIdToColumn([presentTask.columnId, presentTask.id])); // update the next column, that the task was added 

        // close the form
        history.goBack()
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
               
                <h3 className='formTitle' style={colorScheme.main}>Edit the Task here</h3>
                    <form>
        	        
                        <label htmlFor='taskNameInput'>Name</label>
                        <input 
                            style={colorScheme.main}
                            key = {33} 
                            type='text'
                            id='taskNameInput'
                            value={presentTask.name}
                            autoFocus
                            onChange={changeTaskName}
                        />
                        <label htmlFor='descriptionInput'>description</label>
                        <textarea 
                            style={colorScheme.main}
                            cols='20'
                            rows='3'
                            onChange={changeTaskDescription}>
                            descripe your task here...
                        </textarea>
                        <label id='subTaskLabel'>Subtasks</label>
                        <ul>
                            {presentTask.subTasks.map((subTask, index) => {
                                return (
                                     <li key={subTask.id + 0}>
                                        <input
                                            className='inputField subInput'
                                            style={colorScheme.main}
                                            key = {subTask.id + 1}
                                            type='text'
                                            id={index}
                                            value={subTask.name}
                                            aria-labelledby='subTaskLabel'
                                            onChange={(e) => changeSubTaskName(e) } 
                                        />
                                        <button
                                            className='closingCrossButton'     
                                            key = {subTask.id + 2}
                                            id={index} 
                                            aria-label='remove subTask'
                                            onClick={(e) => removeSubTask(e)}>
                                                <img src={cross} id={index} className='iconCross' key={subTask.id + 13} alt=''/>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>

                        <button
                            className = "formButton addNewButton" 
                            style={colorScheme.buttonSecondary}	
                            type = "button"
                            key = {Math.floor(Math.random()*1000)}
                            onClick={addSubTask}>
                        Add more sub tasks
                        </button>
                        <label htmlFor='selectStatus'>Status</label>
                        <select 
                            id='selectStatus' 
                            className='selectStatus' 
                            style={colorScheme.main}
                            onChange={choseTargetColumn}>
                            {allBoards[boardId].columnIds.map(id => {
                                return <option 
                                            key={id} id={id} 
                                            value={id}
                                            style={colorScheme.main2}
                                            selected={id == presentTask.columnId ? true : false}>
                                            {allColumns[id].name}
                                        </option>
                            })}
                        </select>

                        <button 
                            className = "formButton createNewButton"
                            style={colorScheme.buttonPrimary}
                            type = "button"
                            key = {Math.floor(Math.random()*1000)}
                            onClick={storeChanges}>
                            Save the Changes
                        </button>
                        
                        {/* Fehlt hier nicht ein save-button?? */}

                    </form>
            </div>
        </div>
     );
}

export {EditTaskForm};