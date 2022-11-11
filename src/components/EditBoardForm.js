import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { selectBoards } from '../features/boards/boardsSlice'
import { selectColumns } from '../features/columns/columnsSlice'
import { addBoardToBoards } from '../features/boards/boardsSlice';
import { addColumnToColumns } from '../features/columns/columnsSlice';
import cross from '../assets/cross-icon.svg';


function EditBoardForm() {

    const { boardId } = useParams();
    const allBoards = useSelector(selectBoards);
    const presentBoard = allBoards[boardId];
    const allColumns = useSelector(selectColumns);
    const dispatch = useDispatch();
    const history = useHistory();
    const [nameForBoard, setNameForBoard] =       useState('');
    const [newColumnConfig, setnewColumnConfig] = useState([]);


    // initializing the local states with the existing values 
    // of the selected board to pre-fill the form and preserv unchanged data
    useEffect(() => {
        
        setNameForBoard(allBoards[boardId].name);

        // iterating over all existing columns of the selected board to collect the id, name and taskIds
        
        let initialColumns = [];
        allBoards[boardId].columnIds.map(id => initialColumns.push({name: allColumns[id].name , 
                                                                    id: id, 
                                                                    taskIds: allColumns[id].taskIds }) )
        setnewColumnConfig(initialColumns)

    },[boardId])
    


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

        // overriding the existing board with old id but new name and columnIds
        dispatch(addBoardToBoards({name:nameForBoard, id: boardId, columnIds: newColumnConfig.map(el => el.id)}))

         // create all the new columns


         // it musst be checked wether or not the columId existed bevore. If so, it's crucial to pass the existing taskIds. Otherwise you empty all columns when editing the board.

         newColumnConfig.forEach((column) => {
            dispatch(addColumnToColumns({name: column.name, id: column.id.toString(), taskIds:column.taskIds}))
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
            <div className='formContainer'>
                <h3 className='formTitle'>Edit the Board</h3>
                <form>
        	        
                    <label for='boardNameInput'>Name</label>
                    <input 
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
                        type = "button"
                        key = {Math.floor(Math.random()*1000)}
                        onClick={addColumnName}>
                        Add more columns
                    </button>
                    <button 
                        className = "formButton createNewButton"
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