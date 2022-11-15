import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams  } from 'react-router';
import { Link } from 'react-router-dom';
import { addTaskToTasks, selectTasks } from '../features/tasks/tasksSlice';
import { selectBoards } from '../features/boards/boardsSlice'
import { addTaskIdToColumn, removeTaskIdFromColumn, selectColumns } from '../features/columns/columnsSlice';
import { setSubMenuVisibility, selectOptions } from '../features/options/optionsSlice'
import { SubMenu } from './SubMenu';
import cross from '../assets/cross-icon.svg';
import { allColorSchemes }  from '../colorScheme';


function ShowTask() {

    const { boardId } = useParams();
    const { taskId }  = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const allTasks = useSelector(selectTasks);
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
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



    const closeTheForm = (e) => {

        // close the form on click of 'formBackground' or 'iconCross'
        if (e.target.classList.contains('formBackground') ) {
            history.goBack() // to close the form
        }
        if (e.target.classList.contains('closeTheForm') ) {
            history.goBack() // to close the form
        }
    }

    const closeSubMenu = (e) => {
        if (e.target.classList.contains('formContainer') ) {
            dispatch(setSubMenuVisibility(false))
        }
    }


    return ( 
        <div className='formBackground' onClick={closeTheForm} >
            <div className='formContainer' style={colorScheme.main} onClick={closeSubMenu}>
                <SubMenu useCase='task' top='30px' right='30px' />
                <h3 className='formTitle' style={colorScheme.main}>{presentTask.name}</h3>


                <p className='taskDescription'>{presentTask.description} </p>    {/* description here */}

                <label id='columnLabel'>Subtasks</label>
                <ul>
                    {presentTask.subTasks.map((subTask, index) => {
                        return (
                            <li 
                                className='subTaskPresentation'
                                style={colorScheme.main2}
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
                                    className={subTask.status === 'open' ? 'subTaskOpen' : 'subTaskDone'}
                                    style={colorScheme.main2}
                                    htmlFor={index}
                                    id={index}
                                    
                                >
                                    {subTask.name}
                                </label>
                               
                            </li>
                        )})
                    }
                </ul>

                <label>current status</label>

                <select id='selectStatus' 
                        className='selectStatus'
                        style={colorScheme.main} 
                        onChange={choseTargetColumn}>
                    {presentTask.boardColumnIds.map(id => {
                        return <option 
                                    style={colorScheme.main2}
                                    key={id} id={id} 
                                    value={id}
                                    selected={id == presentTask.columnId ? true : false}
                                    >{allColumns[id].name}
                                </option>
                    })}
                </select>
        
            
            </div>
        </div>
     );
}

export { ShowTask };