import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectBoards } from '../features/boards/boardsSlice';
import { selectColumns, addTaskIdToColumn } from '../features/columns/columnsSlice';
import { addTaskToTasks } from '../features/tasks/tasksSlice'
import cross from '../assets/cross-icon.svg';


function NewTaskForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { boardId } = useParams(); 
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    
    const [newTask, setNewTask] = useState({name:'task name', 
                                            id: Math.floor(Math.random()*1000).toString(),
                                            description:'This is to be done', 
                                            columnId:allBoards[boardId].columnIds[0],
                                            boardId: boardId, 
                                            boardColumnIds:allBoards[boardId].columnIds, 
                                            subTasks: [ {name: '', 
                                                        id: Math.floor(Math.random()*1000).toString(), 
                                                        status: 'open'} ]})
   
    const changeTaskName = (e) => {
        const newTaskCopy = {...newTask};           // copy to prevent state-mutation
        newTaskCopy.name = e.target.value;          // change the copy as needed.
        setNewTask(newTaskCopy);                    // update the state with the copy
    }

    const changeTaskDescription = (e) => {
        const newTaskCopy = {...newTask};           // copy to prevent state-mutation
        newTaskCopy.description = e.target.value;   // change the copy as needed.
        setNewTask(newTaskCopy);                    // update the state with the copy
    }
    
    const changeSubTaskName = (e) => {
        const index = +e.target.id                              // the + in front of e.target.id converts string to number
        const newTaskCopy = JSON.parse(JSON.stringify(newTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        newTaskCopy.subTasks[index].name = e.target.value;      // change the indexed element to new value
        setNewTask(newTaskCopy);                                // update the state with the copy
    }

    const removeSubTask = (e) => {
        const index = +e.target.id
        const newTaskCopy = JSON.parse(JSON.stringify(newTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        newTaskCopy.subTasks.splice(index,1)                    // remove the indexed element from the array 
        setNewTask(newTaskCopy);                                // update the state with the copy
    }

    const addSubTask =  (e) => {
        const index = +e.target.id
        const newTaskCopy = JSON.parse(JSON.stringify(newTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        newTaskCopy.subTasks.push({name: '',                    // add a new subTask-object to the array.
                                    id: Math.floor(Math.random()*1000).toString(),
                                    status: 'open'})                    
        setNewTask(newTaskCopy);                                // update the state with the copy
    }


    const choseTargetColumn = (e) => {
        const newTaskCopy = {...newTask};           // copy to prevent state-mutation
        newTaskCopy.columnId = e.target.value;      // change the copy as needed.
        setNewTask(newTaskCopy);                    // update the state with the copy
    }

    const createTheTask = () => {

        // updating the tasks-slice with the newTask.
        dispatch(addTaskToTasks({...newTask}))

        // updating the column-slice with the new task.id
        dispatch(addTaskIdToColumn([newTask.columnId, newTask.id]))
        
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
            <div className='formContainer'>
                <h3 className='formTitle'>Define a new Task here</h3>
                    <form>
        	        
                        <label for='taskNameInput'>Name</label>
                        <input 
                            key = {33} 
                            type='text'
                            id='taskNameInput'
                            value={newTask.name}
                            autoFocus
                            onChange={changeTaskName}
                        />
                        <label for='descriptionInput'>description</label>
                        <textarea 
                            cols='20'
                            rows='3'
                            onChange={changeTaskDescription}>
                            descripe your task here...
                        </textarea>
                        <label id='subTaskLabel'>Subtasks</label>
                        <ul>
                            {newTask.subTasks.map((subTask, index) => {
                                return (
                                     <li key={subTask.id + 0}>
                                        <input
                                            className='inputField subInput'
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
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        onClick={addSubTask}>
                        Add more sub tasks
                        </button>
                        <label for='selectStatus'>Status</label>
                        <select id='selectStatus' className='selectStatus' onChange={choseTargetColumn}>
                            {allBoards[boardId].columnIds.map(id => {
                                return <option key={id} id={id} value={id}>{allColumns[id].name}</option>
                            })}
                        </select>
                        <button 
                            className = "formButton createNewButton"
                            type = "button"
                            key = {Math.floor(Math.random()*1000)}
                            onClick={createTheTask}>
                            Create the Task
                        </button>
                        <button 
                        className = "closingCrossButton closingFormButton"
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        aria-label='close Form'>
                            <img src={cross} className='iconCross closeTheForm' alt=''/>
                         </button>

                    </form>
            </div>
        </div>
     );
}

export {NewTaskForm};