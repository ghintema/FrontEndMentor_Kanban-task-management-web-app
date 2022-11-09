import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectBoards } from '../features/boards/boardsSlice';
import { selectColumns } from '../features/columns/columnsSlice';
import { addCardIdToColumn } from '../features/columns/columnsSlice'
import { addCardToCards } from '../features/cards/cardsSlice'
import cross from '../assets/cross-icon.svg';


function NewTaskForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { boardId } = useParams(); 
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const [nameForNewTask,  setNameForNewTask]              = useState('');
    const [descriptionForNewTask, setDescriptionForNewTask] = useState('');
    const [subTasks,        setSubTasks]                    = useState([{name: '', id:Math.floor(Math.random()*1000), status: 'open' }]);
    const [targetColumnId,  setTargetColumnId]              = useState(allBoards[boardId].columnIds[0]);
    
   
    const changeNameForTask = (e) => {
        setNameForNewTask(e.target.value)
    }

    const changeDescriptionForTask = (e) => {
        setDescriptionForNewTask(e.target.value)
    }
    
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
        subTasksCopy.push({name: 'new taks', id: Math.floor(Math.random()*1000), status: 'open' });                   // add new empty entry
        setSubTasks([...subTasksCopy]);     // set all new names to the state
    }


    const choseTargetColumn = (e) => {
        setTargetColumnId(e.target.value)
    }

    const createTheTask = () => {

        const newCardsId = Math.floor(Math.random()*1000).toString();

        dispatch(addCardToCards({name: nameForNewTask, 
                                 id: newCardsId, 
                                 description: descriptionForNewTask,
                                 columnId: targetColumnId,
                                 boardColumnIds: allBoards[boardId].columnIds, 
                                 subTasks:  subTasks.map(subTask => {
                                            return {[subTask.id]: { name: subTask.name, 
                                                                    id: subTask.id,
                                                                    status: 'open' } }})}));
        
        dispatch(addCardIdToColumn([targetColumnId, newCardsId]))

        history.goBack()

    }

    const closeTheForm = (e) => {
        history.goBack()
    }

    console.log(allColumns)
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
                            autoFocus
                            onChange={changeNameForTask}
                        />
                        <label for='descriptionInput'>description</label>
                        <textarea 
                            cols='20'
                            rows='3'
                            onChange={changeDescriptionForTask}>
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
                        aria-label='close Form'
                        onClick={closeTheForm}>
                            <img src={cross} className='iconCross' alt=''/>
                         </button>

                    </form>
            </div>
        </div>
     );
}

export {NewTaskForm};