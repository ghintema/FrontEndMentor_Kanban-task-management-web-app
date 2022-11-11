import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { selectTasks } from '../features/tasks/tasksSlice';
import cross from '../assets/cross-icon.svg';
import { selectColumns } from '../features/columns/columnsSlice';


function EditTaskForm() {

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



    
   

    // initializing the local states with the existing values 
    // of the selected task to pre-fill the form and to preserv unchanged data
    

  
    const changeTaskName = (e) => {
        let presentTaskCopy = {...presentTask}; // copy to prevent state-mutation
        presentTaskCopy.name = e.target.value;  // change the copy as needed.
        setPresentTask(presentTaskCopy);        // reset the state with the copy
    }

    const changeSubTaskName = (e) => {
        const index = +e.target.id
        let presentTaskCopy = {...presentTask};             // copy to prevent state-mutation
        presentTaskCopy.subTasks[index].name = e.target.value;// reset the state with the copy
    }


    const addSubTask = (e) => {

        const index = +e.target.id
        let presentTaskCopy = {...presentTask};             // copy to prevent state-mutation
        presentTaskCopy.subTasks.push({ name: e.target.value, 
                                        id: Math.floor(Math.random()*1000).toString() })



        // one blank inputfield is in the form to offer. 
        // OnChange of this field a new object is add to local subTask-State
        // POSSIBLE BONUS: This input field is hidden in an animated accordeon
        // Alternatively: The known 'add new Subtask' button bellow the list of existing subTask but without a blank input field.
        //      Advantage: addSubTask would work exactly like in NewTaskForm

        // It maybe important to give the new subtasks a completely new status to differ  the rendering.
    }

    const removeSubTask = (e) => {

        const index = +e.target.id
        let presentTaskCopy = {...presentTask};             // copy to prevent state-mutation
        presentTaskCopy.subTasks.splice(index,1);           // remove the indexed element from the array
        setPresentTask(presentTaskCopy)                     // reset the state with the copy

    }

    const choseTargetColumn = (e) => {
        
        let presentTaskCopy = {...presentTask};             // copy to prevent state-mutation
        presentTaskCopy.ColumnId = e.target.value;
        setPresentTask(presentTaskCopy);                     // reset the state with the copy

    }

    const storeChanges = () => {

        
        history.goBack() // to close the form

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
                <h3 className='formTitle'>Edit the Task</h3>
                <form>
        	        
                    <label for='taskNameInput'>Name</label>
                    <input 
                        key = {33} //{Math.floor(Math.random()*1000)}
                        type='text'
                        id='taskNameInput'
                        value={presentTask.name}
                        onChange={changeTaskName}
                    />


                    {/* description here */}

                    <label id='columnLabel'>Subtasks</label>
                    <ul>
                        {presentTask.subTasks
                            .filter(subTask => subTask.status === 'open' || subTask.status === 'done')
                            .map((subTask, index) => {
                                return (
                                    <li 
                                        className='subTaskPresentation'
                                        key={subTask.id + 0}
                                    >
                                        <input 
                                            type='text'
                                            // className='checkbox'
                                            id={index}
                                            onChange={changeSubTaskName}
                                        />
                                        <button
                                            className='closingCrossButton'     
                                            key = {subTask.id + 2}
                                            id={index} 
                                            aria-label='remove sub task'
                                            onClick={(e) => removeSubTask(e)}
                                        >
                                            <img src={cross} id={index} className='iconCross' key={subTask.id + 13} alt=''/>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <select id='selectStatus' className='selectStatus' onChange={choseTargetColumn}>
                            {presentTask.boardColumnIds.map(id => {
                                return <option key={id} id={id} value={id}>{allColumns[id].name}</option>
                            })}
                    </select>
                    
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

export { EditTaskForm };