import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addTaskToTasks, selectTasks } from '../features/tasks/tasksSlice';
import { addTaskIdToColumn, removeTaskIdFromColumn, selectColumns } from '../features/columns/columnsSlice';
import cross from '../assets/cross-icon.svg';


function ShowTask() {

    const { taskId }  = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const allTasks = useSelector(selectTasks);
    const allColumns = useSelector(selectColumns);

    const [presentTask, setPresentTask] = useState({subTasks: [], boardColumnIds:[]})
   
    // initializing the local states with the existing values 
    // of the selected task to pre-fill the form and to preserv unchanged data
    useEffect(() => { 

        setPresentTask(allTasks[taskId])

    },[taskId])

    const changeSubTaskStatus = (e) => {

        const index = +e.target.id

        // let presentTaskCopy = {...presentTask};             // copy to prevent state-mutation
        let presentTaskCopy = JSON.parse(JSON.stringify(presentTask)) // spread-operator is not sufficient here because deep-level property is about to be changed.
        if (e.target.checked) {
            presentTaskCopy.subTasks[index].status = 'done';  // change the copy as needed.
        } else {
            presentTaskCopy.subTasks[index].status = 'open';  // change the copy as needed.
        }

        setPresentTask(presentTaskCopy);                     // update the local state with the copy

        dispatch(addTaskToTasks({...presentTaskCopy}))      // update the task with new subTask.status

    }

    const choseTargetColumn = (e) => {
        
        let presentTaskCopy = {...presentTask};             // copy to prevent state-mutation
        presentTaskCopy.columnId = e.target.value;
        setPresentTask(presentTaskCopy);                     // update the local state with the copy

        dispatch(addTaskToTasks({...presentTaskCopy}))                   // update the task with new columnId
        dispatch(removeTaskIdFromColumn([presentTask.columnId, taskId])) // update the former column, that the task was removed
        dispatch(addTaskIdToColumn([presentTaskCopy.columnId, taskId])); // update the next column, that the task was added 
        
    }

    const showSubmenu = () => {

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
        <div className='formBackground' onClick={closeTheForm} >
            <div className='formContainer'>
                <h3 className='formTitle'>{presentTask.name}</h3>


                <p className='taskDescription'>{presentTask.description} </p>    {/* description here */}

                <label id='columnLabel'>Subtasks</label>
                <ul>
                    {presentTask.subTasks.map((subTask, index) => {
                        return (
                            <li 
                                className='subTaskPresentation'
                                key={subTask.id + 0}
                            >
                                <input 
                                    type='checkbox'
                                    className='checkbox'
                                    id={index}
                                    onChange={changeSubTaskStatus}
                                    checked={subTask.status === 'done' ? true : false }
                                />
                                <label
                                    for={index}
                                    id={index}
                                    className={subTask.status === 'open' ? 'subTaskOpen' : 'subTaskDone'}
                                >
                                    {subTask.name}
                                </label>
                               
                            </li>
                        )})
                    }
                </ul>

                <label>current status</label>

                <select id='selectStatus' className='selectStatus' onChange={choseTargetColumn}>
                    {presentTask.boardColumnIds.map(id => {
                        return <option 
                                    key={id} id={id} 
                                    value={id}
                                    selected={id == presentTask.columnId ? true : false}
                                    >{allColumns[id].name}
                                </option>
                    })}
                </select>

                <button
                    onClick={showSubmenu}>
                    More...
                </button>
                    
                <button 
                    className = "closingCrossButton closingFormButton"
                    type = "button"
                    key = {Math.floor(Math.random()*1000)}
                    aria-label='close Form'
                    // onClick={closeTheFormCross}
                    >
                        <img src={cross} className='iconCross closeTheForm' alt=''/>
                </button> 
        
            
            </div>
        </div>
     );
}

export { ShowTask };