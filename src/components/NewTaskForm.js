import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBoards } from '../features/boards/boardsSlice';
import { addCardToCards } from '../features/cards/cardsSlice'
import cross from '../assets/cross-icon.svg';

function NewTaskForm() {

    const { boardId } = useParams() 
    const [nameForNewTask, setNameForNewTask]               = useState('')
    const [descriptionForNewTask, setDescriptionForNewTask] = useState('')
    const [subTasks, setSubTasks]                           = useState([{name: 'First...',  id:Math.floor(Math.random()*1000) },
                                                                        {name: 'Second...', id:Math.floor(Math.random()*1000) }]);
    const [status, setStatus]                               = useState()
    
    const allBoards = useSelector(selectBoards)



    const changeSubTasks = (e) => {
        const index = +e.target.id                    // the + in front of e.target.id converts string to number
        const subTasksCopy = [...subTasks];           // copy to prevent state-mutation
        subTasksCopy[index].name = e.target.value;    // change the indexed element to new value
        setSubTasks([...subTasksCopy]);                // set all new subTasks to the state
    }

    const removeSubTask = (e) => {
        const index = +e.target.id
        const subTasksCopy = [...subTasks];           // copy to prevent state-mutation
        subTasksCopy.splice(index,1)                  // remove the indexed element from the array 
        setSubTasks([...subTasksCopy]);     // set all new names to the state
    }

    const addSubTask =  () => {
        const subTasksCopy = [...subTasks];           // copy to prevent state-mutation
        subTasksCopy.push({name: 'new taks', id: Math.floor(Math.random()*1000) });                   // add new empty entry
        setSubTasks([...subTasksCopy]);     // set all new names to the state
    }

    const createTheTask = () => {

        // editing the possible new board name?
    }


    return ( 
        <div className='formBackground' >
            <div className='formContainer'>
                <h3 className='formTitle'>Define a new Task here</h3>
                    <form>
        	        
                        <label for='taskNameInput'>Name</label>
                        <input 
                            key = {33} //{Math.floor(Math.random()*1000)}
                            type='text'
                            id='taskNameInput'
                            value={nameForNewTask}
                            onChange={(e) => setNameForNewTask(e.target.value)}
                        />
                        <label for='descriptionInput'>description</label>
                        <textarea 
                            cols='20'
                            rows='5'>
                            descripe your task here...
                        </textarea>
                        <label id='subTaskLabel'>Subtasks</label>
                        <ul>
                            {subTasks.map((subTask, index) => {
                                return (
                                     <li key={subTask.id + 0}>
                                        <input
                                            className='inputField subInput'
                                            key = {subTask.id + 1}
                                            type='text'
                                            id={index}
                                            value={subTask.name}
                                            aria-labelledby='subTaskLabel'
                                            onChange={(e) => changeSubTasks(e) } 
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
                        <button 
                            className = "formButton createNewButton"
                            type = "button"
                            key = {Math.floor(Math.random()*1000)}
                            onClick={createTheTask}>
                            Create the Task
                        </button>

                    </form>
            </div>
        </div>
     );
}

export {NewTaskForm};