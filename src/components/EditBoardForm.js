import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { selectBoards, addBoardToBoards } from '../features/boards/boardsSlice'
import { selectColumns, addColumnToColumns } from '../features/columns/columnsSlice'
import { selectTasks, addBoardColumnIdToTask } from '../features/tasks/tasksSlice';
import { selectOptions } from '../features/options/optionsSlice';
import cross from '../assets/cross-icon.svg';
import { allColorSchemes }  from '../colorScheme';


function EditBoardForm() {

    
    const { boardId } = useParams();
    const allBoards = useSelector(selectBoards);
    const allColumns = useSelector(selectColumns);
    const allTasks = useSelector(selectTasks); // all of the boards tasks need be updated with the new columns.
    const options = useSelector(selectOptions);
    const dispatch = useDispatch();
    const history = useHistory();

    let initialColumns = [];
    allBoards[boardId].columnIds.map(id => initialColumns.push({name: allColumns[id].name , 
                                                                id: id, 
                                                                taskIds: allColumns[id].taskIds }) )
    
    const [newColumnConfig, setnewColumnConfig] = useState(initialColumns);
    const [nameForBoard, setNameForBoard]       = useState(allBoards[boardId].name);
    const [ colorScheme, setColorScheme ]       = useState({});

    
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


    const changeColumnName = (e) => {
        const index = +e.target.id                          // the + in front of e.target.id converts string to number
        const columnConfigCopy = [...newColumnConfig];      // copy to prevent state-mutation
        columnConfigCopy[index].name = e.target.value;      // change the indexed element to new value
        setnewColumnConfig([...columnConfigCopy]);          // set all new names to the state
    }

    const removeColumnName = (e) => {
        const index = +e.target.id
        const columnConfigCopy = [...newColumnConfig];      // copy to prevent state-mutation
        columnConfigCopy.splice(index,1)                    // remove the indexed element from the array 
        setnewColumnConfig([...columnConfigCopy]);          // set all new names to the state
    }

    const addColumnName =  () => {
        const columnConfigCopy = [...newColumnConfig];      // copy to prevent state-mutation
        columnConfigCopy.push({ name: 'new',                
                                id: Math.floor(Math.random()*1000), 
                                taskIds: [] });             // add new empty entry       
        setnewColumnConfig([...columnConfigCopy]);          // set all new names to the state
    }




    const storeChanges = () => {

    
        // updating the board-slice with the newColumnConfig.
        // overriding the existing board with old id but new name and columnIds
        dispatch(addBoardToBoards({name:nameForBoard, id: boardId, columnIds: newColumnConfig.map(el => el.id)}))

         // updating the column-slice with the newColumnConfig. There is a duplicate-check in the reducer.
         newColumnConfig.forEach((column) => {
            dispatch(addColumnToColumns({name: column.name, id: column.id.toString(), taskIds:column.taskIds}))
        })

        // updating the task-slice with the newColumnConfig. There is a duplicate-check in the reducer.
        // all tasks in a board need to be aware of all columns in that board to be able to change the tasks column.
        Object.values(allTasks).filter(task => task.boardId === boardId)
                                .forEach(task => {
                                    newColumnConfig.forEach(columnId => {
                                        dispatch(addBoardColumnIdToTask([task.id, columnId.id ]))})
                                    })


        history.goBack() // to close the form.
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
                <h3 className='formTitle' style={colorScheme.main}>Edit the Board</h3>
                <form>
        	        
                    <label htmlFor='boardNameInput'>Name</label>
                    <input 
                        style={colorScheme.main}
                        key = {33} //{Math.floor(Math.random()*1000)}
                        type='text'
                        id='boardNameInput'
                        value={nameForBoard}
                        onChange={(e) => setNameForBoard(e.target.value)}
                    />
                    <label id='columnLabel'>Columns</label>
                    <ul>
                        {newColumnConfig.map((column, index) => {
                            return (
                                <li key={column.id + 0}>
                                    <input
                                        className='inputField subInput'
                                        style={colorScheme.main}
                                        key = {column.id + 1}
                                        type='text'
                                        id={index}
                                        value={column.name}
                                        aria-labelledby='columnLabel'
                                        onChange={(e) => changeColumnName(e) } 
                                    />
                                    <button
                                        className='closingCrossButton'     
                                        key = {column.id + 2}
                                        id={index} 
                                        aria-label='remove column'
                                        onClick={(e) => removeColumnName(e)}>
                                            <img src={cross} id={index} className='iconCross' key={column.id + 13} alt=''/>
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
                        onClick={addColumnName}>
                        Add more columns
                    </button>
                    <button 
                        className = "formButton createNewButton"
                        style={colorScheme.buttonPrimary}
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        onClick={storeChanges}>
                        Save the Changes
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

export {EditBoardForm};