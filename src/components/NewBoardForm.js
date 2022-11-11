import React, { useState } from 'react';
import { addBoardToBoards } from '../features/boards/boardsSlice';
import { addColumnToColumns } from '../features/columns/columnsSlice';
import { useDispatch, useSelector } from 'react-redux';
import cross from '../assets/cross-icon.svg';
import { useHistory } from 'react-router';

//first, collect all necessary data in lokal states. Those are: Name of the board and name of all columns in that board.
//second, on submit, dispatch all actions to create the board and all the new columns

function NewBoardForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [nameForNewBoard, setNameForNewBoard] =       useState('New Board');
    const [namesForNewColumns, setNamesForNewColumns] = useState([{name: 'ToDo',  id:Math.floor(Math.random()*1000) },
                                                                  {name: 'Doing', id:Math.floor(Math.random()*1000) },
                                                                  {name: 'Done',  id:Math.floor(Math.random()*1000) }]);
    

    const changeColumnName = (e) => {
        const index = +e.target.id                   // the + in front of e.target.id converts string to number
        const columnNames = [...namesForNewColumns]; // copy to prevent state-mutation
        columnNames[index].name = e.target.value;    // change the indexed element to new value
        setNamesForNewColumns([...columnNames]);     // set all new names to the state
    }

    const removeColumnName = (e) => {
        const index = +e.target.id
        const columnNames = [...namesForNewColumns]; // copy to prevent state-mutation
        columnNames.splice(index,1)                  // remove the indexed element from the array 
        setNamesForNewColumns([...columnNames]);     // set all new names to the state
    }

    const addColumnName =  () => {
        const columnNames = [...namesForNewColumns]; // copy to prevent state-mutation
        columnNames.push({name: 'new', id: Math.floor(Math.random()*1000) });                   // add new empty entry
        setNamesForNewColumns([...columnNames]);     // set all new names to the state
    }
    
    
    const createTheBoard = (e) => {
        e.preventDefault()

        const newBoardsId = Math.floor(Math.random()*1000).toString();

        // create the new Board
        dispatch(addBoardToBoards({name:nameForNewBoard, 
                                   id: newBoardsId, 
                                   columnIds: namesForNewColumns.map(el => el.id)}))


        // create all the new columns
        namesForNewColumns.forEach((column) => {
            dispatch(addColumnToColumns({name: column.name, id: column.id.toString(), taskIds:[]}))
        })

        // reset the form
        setNamesForNewColumns([ {name: 'ToDo',  id:Math.floor(Math.random()*1000) },
                                {name: 'Doing', id:Math.floor(Math.random()*1000) },
                                {name: 'Done',  id:Math.floor(Math.random()*1000) }])

        // close the form

        history.goBack();
    }

    const closeTheForm = (e) => {
        history.goBack()
    }


    // IMPORTANT: Make sure that:
        // the keys of the input-fields are unique in the list, constant over re-rendering and independent of the list-position. 
        // 1.) Every input-field has its unique key all over the Component, even if it chances the position in the list.  
        // 2.) that one and the same inputfield has a constant key assigned, even if the same keys to the input field on every render. Otherwise it is going to loos focos.
        // the key doesn't change on re-render (does not be changing random-number) and does not depend on sequenz, 

        // It's also important NOT to submit the form to prevent reload of the page.
    return ( 
        <div className='formBackground' >
            <div className='formContainer'>
                <h3 className='formTitle'>Define a new Board here</h3>
                <form>
        	        
                    <label for='boardNameInput'>Name</label>
                    <input 
                        key = {33} //{Math.floor(Math.random()*1000)}
                        type='text'
                        id='boardNameInput'
                        value={nameForNewBoard}
                        autoFocus
                        onChange={(e) => setNameForNewBoard(e.target.value)}
                    />
                    <label id='columnLabel'>Columns</label>
                    <ul>
                        {namesForNewColumns.map((column, index) => {
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
                        onClick={createTheBoard}>
                        Create the Board
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

export {NewBoardForm};